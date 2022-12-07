var express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var router = express.Router();

var path = require('path');
const { currencyFormatter } = require('../helpers/util')
const { isLoggedIn } = require('../helpers/util')

/* GET home page. */
module.exports = function (db) {
  router.get('/', function (req, res) {
    res.render('login', {
      info: req.flash('info')
    });
  });

  router.post('/', function (req, res) {
    const { email_user, password } = req.body
    db.query('SELECT * FROM users WHERE email_user = $1', [email_user], (err, data) => {
      if (err) {
        console.log(err)
        return res.send(err)
      }

      if (data.rows.length == 0) {
        req.flash('info', 'Email Tidak Terdaftar')
        return res.redirect('/');
      }

      bcrypt.compare(password, data.rows[0].password, function (err, result) {
        if (err) return res.send(err)

        if (!result) {
          req.flash('info', 'Password Salah')
          return res.redirect('/');
        }
        req.session.user = data.rows[0]
        if (req.session.user.role == 'Admin') {
          res.redirect('/utama');
        } else {
          res.redirect('/penjualan');
        }

      });
    })
  });

  router.get('/logout', isLoggedIn, function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/')
    })
  });

  router.get('/utama', isLoggedIn, function (req, res) {
    const { cari_id, cari_nama } = req.query
    let searchb = []
    let countb = 1
    let syntaxb = []
    let sql_countb = 'SELECT count(*) AS total FROM barang'
    let sqlb = 'SELECT * FROM barang'
    if (cari_id) {
      sqlb += ' WHERE '
      sql_countb += ' WHERE '
      searchb.push(`%${cari_id}%`)
      syntaxb.push(`id_barang ilike '%' || $${countb++} || '%'`)
      countb++
    }
    if (cari_nama) {
      if (!sqlb.includes(' WHERE ')) {
        sqlb += ' WHERE '
        sql_countb += ' WHERE '
      }
      searchb.push(`%${cari_nama}%`)
      syntaxb.push(` nama_barang ilike '%' || $${countb++} || '%'`)
      countb++
    }

    if (syntaxb.length > 0) {
      sqlb += syntaxb.join(' AND ')
      sqlb += ` ORDER BY id_barang ASC`

      sql_countb += syntaxb.join(' AND ')
      sql_countb += ` GROUP BY id_barang ORDER BY id_barang ASC`
    }
    db.query(sqlb, searchb, (err, barang) => {
      if (err) console.log(err)
      //const id_barang = req.query.id_barang ? req.query.id_barang : barang.rows.length > 0 ? barang.rows[0].id_barang : '';
      const id_barang = req.query.id_barang ? req.query.id_barang : '';

      db.query('SELECT dp.*, b.nama_barang FROM varian as dp LEFT JOIN barang as b ON dp.id_barang = b.id_barang WHERE dp.id_barang = $1 ORDER BY dp.id_varian ASC', [id_barang], (err, varian) => {
        if (err) console.log(err)

        //----------------------------------------------------------------------------vGudang        
        let wheresg = []
        let valuesg = []
        let countg = 1

        if (req.query.cari_id_gudang) {
          wheresg.push(`id_gudang ilike '%' || $${countg++} || '%'`);
          valuesg.push(req.query.cari_id_gudang);
        }

        if (req.query.cari_nama_gudang) {
          wheresg.push(`nama_gudang ilike '%' || $${countg++} || '%'`);
          valuesg.push(req.query.cari_nama_gudang);
        }

        if (req.query.cari_alamat_gudang) {
          wheresg.push(`alamat_gudang ilike '%' || $${countg++} || '%'`);
          valuesg.push(req.query.cari_alamat_gudang);
        }

        sqlg = 'SELECT * FROM gudang'
        if (wheresg.length > 0) {
          sqlg += ` WHERE ${wheresg.join(' AND ')}`
        }

        sqlg += ` ORDER BY id_gudang`


        db.query(sqlg, valuesg, (err, gudang) => {
          //----------------------------------------------------------------------------vSatuan
          let swheres = []
          let svalues = []
          let scount = 1

          if (req.query.cari_id_satuan) {
            swheres.push(`id_satuan ilike '%' || $${scount++} || '%'`);
            svalues.push(req.query.cari_id_satuan);
          }

          if (req.query.cari_nama_satuan) {
            swheres.push(`nama_satuan ilike '%' || $${scount++} || '%'`);
            svalues.push(req.query.cari_nama_satuan);
          }

          sqls = 'SELECT * FROM satuan'
          if (swheres.length > 0) {
            sqls += ` WHERE ${swheres.join(' AND ')}`
          }

          sqls += ' ORDER BY id_satuan'

          db.query(sqls, svalues, (err, satuan) => {
            //----------------------------------------------------------------------------vUsers
            let supwheres = []
            let supvalues = []
            let supcount = 1

            if (req.query.cari_id_supplier) {
              supwheres.push(`id_supplier ilike '%' || $${supcount++} || '%'`);
              supvalues.push(req.query.cari_id_supplier);
            }

            if (req.query.cari_nama_supplier) {
              supwheres.push(`nama_supplier ilike '%' || $${supcount++} || '%'`);
              supvalues.push(req.query.cari_nama_supplier);
            }

            if (req.query.cari_alamat_supplier) {
              supwheres.push(`alamat_supplier ilike '%' || $${supcount++} || '%'`);
              supvalues.push(req.query.cari_alamat_supplier);
            }

            if (req.query.cari_telepon_supplier) {
              supwheres.push(`telepon_supplier ilike '%' || $${supcount++} || '%'`);
              supvalues.push(req.query.cari_telepon_supplier);
            }

            if (req.query.cari_email_supplier) {
              supwheres.push(`email_supplier ilike '%' || $${supcount++} || '%'`);
              supvalues.push(req.query.cari_email_supplier);
            }

            supsql = 'SELECT * FROM supplier '
            if (supwheres.length > 0) {
              supsql += ` WHERE ${supwheres.join(' AND ')}`
            }

            supsql += 'ORDER BY id_supplier'


            db.query(supsql, supvalues, (err, supplier) => {

              let uwheres = []
              let uvalues = []
              let ucount = 1

              if (req.query.cari_email) {
                uwheres.push(`email_user ilike '%' || $${ucount++} || '%'`);
                uvalues.push(req.query.cari_email);
              }

              if (req.query.cari_username) {
                uwheres.push(`username ilike '%' || $${ucount++} || '%'`);
                uvalues.push(req.query.cari_username);
              }

              if (req.query.cari_role) {
                uwheres.push(`role = $${ucount++}`);
                uvalues.push(req.query.cari_role);
              }

              usql = 'SELECT * FROM users '
              if (uwheres.length > 0) {
                usql += ` WHERE ${uwheres.join(' AND ')}`
              }

              usql += 'ORDER BY id_users'



              db.query(usql, uvalues, (err, users) => {

                //----------------------------------------------------------------------------vPenjualan
                const { cari_inv, searchStartDate, searchEndDate } = req.query
                let searchju = []
                let countju = 1
                let syntaxju = []
                let sqlju_countju = 'SELECT countju(*) AS total FROM barang'
                let sqlju = 'SELECT * FROM penjualan'
                if (cari_inv) {
                  sqlju += ' WHERE '
                  sqlju_countju += ' WHERE '
                  searchju.push(`%${cari_inv}%`)
                  syntaxju.push(`no_invoice ilike '%' || $${countju++} || '%'`)
                  countju++
                }
                if (searchStartDate && searchEndDate) {
                  if (!sqlju.includes(' WHERE ')) {
                    sqlju += ' WHERE'
                    sqlju_countju += ' WHERE'
                  }
                  searchju.push(`${searchStartDate}`)
                  searchju.push(`${searchEndDate}`)
                  syntaxju.push(` tanggal_penjualan >= $${countju} AND tanggal_penjualan < $${countju + 1}`)
                  countju++
                  countju++
                } else if (searchStartDate) {
                  if (!sqlju.includes(' WHERE ')) {
                    sqlju += ' WHERE'
                    sqlju_countju += ' WHERE'
                  }
                  searchju.push(`${searchStartDate}`)
                  syntaxju.push(` tanggal_penjualan >= $${countju}`)
                  countju++
                } else if (searchEndDate) {
                  if (!sqlju.includes(' WHERE ')) {
                    sqlju += ' WHERE'
                    sqlju_countju += ' WHERE'
                  }
                  searchju.push(`${searchEndDate}`)
                  syntaxju.push(` tanggal_penjualan <= $${countju}`)
                  countju++
                }

                if (syntaxju.length > 0) {
                  sqlju += syntaxju.join(' AND ')


                  sqlju_countju += syntaxju.join(' AND ')
                  sqlju_countju += ` GROUP BY no_invoice ORDER BY id_barang ASC`
                }
                sqlju += ` ORDER BY tanggal_penjualan DESC`

                db.query(sqlju, searchju, (err, penjualan) => {
                  const noInvoice = req.query.noInvoice ? req.query.noInvoice : '';
                  db.query('SELECT dp.*, v.nama_varian FROM penjualan_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian WHERE dp.no_invoice = $1 ORDER BY dp.id_detail_jual', [noInvoice], (err, detailsj) => {
                    db.query('SELECT var.*, b.id_barang, b.nama_barang FROM varian as var LEFT JOIN barang as b ON var.id_barang = b.id_barang ORDER BY var.id_barang', (err, varianju) => {
                      db.query('SELECT dp.*,pe.*,v.nama_varian FROM penjualan_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian LEFT JOIN penjualan as pe ON dp.no_invoice = pe.no_invoice WHERE dp.no_invoice = $1', [noInvoice], (err, print) => {
                        //console.log('print', print.rows[0].no_invoice)
                        db.query('SELECT sum(total_harga_jual) AS uangmasuk FROM penjualan', (err, uangMasuk) => {


                          //----------------------------------------------------------------------------vPembelian
                          const { cari_inv2, searchStartDate2, searchEndDate2 } = req.query
                          let searchbl = []
                          let countbl = 1
                          let syntaxbl = []
                          let sqlbl_countbl = 'SELECT countbl(*) AS total FROM barang'
                          let sqlbl = 'SELECT * FROM pembelian'
                          if (cari_inv2) {
                            sqlbl += ' WHERE '
                            sqlbl_countbl += ' WHERE '
                            searchbl.push(`%${cari_inv2}%`)
                            syntaxbl.push(`no_invoice ilike '%' || $${countbl++} || '%'`)
                            countbl++
                          }
                          if (searchStartDate2 && searchEndDate2) {
                            if (!sqlbl.includes(' WHERE ')) {
                              sqlbl += ' WHERE'
                              sqlbl_countbl += ' WHERE'
                            }
                            searchbl.push(`${searchStartDate2}`)
                            searchbl.push(`${searchEndDate2}`)
                            syntaxbl.push(` tanggal_pembelian >= $${countbl} AND tanggal_pembelian < $${countbl + 1}`)
                            countbl++
                            countbl++
                          } else if (searchStartDate2) {
                            if (!sqlbl.includes(' WHERE ')) {
                              sqlbl += ' WHERE'
                              sqlbl_countbl += ' WHERE'
                            }
                            searchbl.push(`${searchStartDate2}`)
                            syntaxbl.push(` tanggal_pembelian >= $${countbl}`)
                            countbl++
                          } else if (searchEndDate2) {
                            if (!sqlbl.includes(' WHERE ')) {
                              sqlbl += ' WHERE'
                              sqlbl_countbl += ' WHERE'
                            }
                            searchbl.push(`${searchEndDate2}`)
                            syntaxbl.push(` tanggal_pembelian <= $${countbl}`)
                            countbl++
                          }

                          if (syntaxbl.length > 0) {
                            sqlbl += syntaxbl.join(' AND ')


                            sqlbl_countbl += syntaxbl.join(' AND ')
                            sqlbl_countbl += ` GROUP BY no_invoice ORDER BY id_barang ASC`
                          }
                          sqlbl += ` ORDER BY tanggal_pembelian DESC`

                          db.query(sqlbl, searchbl, (err, pembelian) => {
                            console.log('sqlbl',sqlbl)
                            //const noInvoice = req.query.noInvoice ? req.query.noInvoice : rows.length > 0 ? rows[0].no_invoice : '';
                            const noInvoice = req.query.noInvoice ? req.query.noInvoice : '';

                            db.query('SELECT dp.*, v.nama_varian FROM pembelian_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian WHERE dp.no_invoice = $1 ORDER BY dp.id_detail_beli', [noInvoice], (err, detailsb) => {
                              db.query('SELECT var.*, b.id_barang, b.nama_barang FROM varian as var LEFT JOIN barang as b ON var.id_barang = b.id_barang ORDER BY var.id_barang', (err, varianb) => {
                                db.query('SELECT * FROM gudang ORDER BY id_gudang', (err, gudangb) => {
                                  db.query('SELECT * FROM supplier ORDER BY id_supplier', (err, supplierb) => {
                                    db.query('SELECT dp.*,pe.*,v.nama_varian FROM pembelian_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian LEFT JOIN pembelian as pe ON dp.no_invoice = pe.no_invoice WHERE dp.no_invoice = $1', [noInvoice], (err, print2) => {
                                      db.query('SELECT sum(total_harga_beli) AS uangkeluar FROM pembelian', (err, uangKeluar) => {
                                        //console.log('uangKeluar', uangKeluar.rows[0].uangkeluar)
                                        db.query('SELECT sum(jd.qty * (var.harga_jual_varian - var.harga_beli_varian)) AS profit FROM penjualan_detail jd LEFT JOIN varian var ON var.id_varian = jd.id_varian', (err, profit) => {
                                          //console.log('profit', profit.rows[0].profit)
                                          db.query(`SELECT count(no_invoice) AS totaljual FROM penjualan`, (err, totaljual) => {
                                            db.query(`SELECT count(no_invoice) AS totalbeli FROM pembelian`, (err, totalbeli) => {

                                              res.render('utama', {
                                                varian: varian.rows,
                                                barang: barang.rows,
                                                gudang: gudang.rows,
                                                gudangb: gudangb.rows,
                                                penjualan: penjualan.rows,
                                                pembelian: pembelian.rows,
                                                satuan: satuan.rows,
                                                supplierb: supplierb.rows,
                                                supplier: supplier.rows,
                                                users: users.rows,
                                                currencyFormatter,
                                                detailsj: detailsj.rows,
                                                detailsb: detailsb.rows,
                                                varian: varian.rows,
                                                varianb: varianb.rows,
                                                varianju: varianju.rows,
                                                print,
                                                print2,
                                                profit: profit.rows[0].profit,
                                                query: req.query,
                                                uangMasuk: uangMasuk.rows[0].uangmasuk,
                                                uangKeluar: uangKeluar.rows[0].uangkeluar,
                                                totaljual: totaljual.rows[0].totaljual,
                                                totalbeli: totalbeli.rows[0].totalbeli,
                                                user: req.session.user
                                              })
                                            })
                                          })
                                        })
                                      })
                                    })
                                  })
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  });

  return router;
}