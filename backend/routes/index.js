var express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var router = express.Router();
var jwt = require('jsonwebtoken');

var path = require('path');
const { currencyFormatter, isLoggedIn, Response } = require('../helpers/util')
// const { isLoggedIn } = require('../helpers/util')

/* GET home page. */
module.exports = function (db) {
  router.get('/', function (req, res) {
    res.json(new Response({ message: "Halaman Awal" }, true))
  });
  //login
  router.post('/auth', async function (req, res) {
    try {
      const { email_user, password } = req.body
      db.query('SELECT * FROM users WHERE email_user = $1', [email_user], (err, data) => {
        if (err) {
          throw new Error(err)
          // console.log(err)
          // return res.send(err)
        }

        if (data.rows.length == 0) {
          // req.flash('info', 'Email Tidak Terdaftar')
          // return res.redirect('/');
          return res.json(new Response({ message: "unregistered e-mail" }, false))
        }

        bcrypt.compare(password, data.rows[0].password, async function (err, result) {
          if (err) throw new Error(err)

          if (!result) {
            // req.flash('info', 'Password Salah')
            // return res.redirect('/');
            return res.json(new Response({ message: "password doesn't match" }, false))
          }

          //crete token 
          var token = jwt.sign({
            userid: data.rows[0].id_users,
            email: data.rows[0].email_user,
          }, process.env.SECRETKEY);
          const { rows } = await db.query(`WITH updated AS (UPDATE public.users SET token = $1 WHERE id_users = $2 RETURNING *) SELECT * FROM updated LEFT JOIN outlet ON updated.id_outlet = outlet.id_outlet;`, [token, data.rows[0].id_users])

          // req.session.user = data.rows[0]
          // if (req.session.user.role == 'Admin') {
          //   res.redirect('/utama');
          // } else {
          //   res.redirect('/penjualan');
          // }
          //console.log("update token", rows);
          res.json(new Response({
            userid: rows[0].id_users,
            email: rows[0].email_user,
            username: rows[0].username,
            role: rows[0].role,
            //notepad: rows[0].notepad,

            id_outlet: rows[0].id_outlet,
            nama_outlet: rows[0].nama_outlet,
            alamat_outlet: rows[0].alamat_outlet,
            kontak_outlet: rows[0].kontak_outlet,
            token: rows[0].token
          }))
        });
      })
    } catch (error) {
      //console.log(`gagal`, e)
      res.status(500).json(new Response(e, false))
    }
  });

  router.get('/logout', async function (req, res) {
    const token = req.headers.authorization;
    if (token && token.split(' ')[1]) {
      const pureToken = token.split(' ')[1]
      try {
        const result = jwt.verify(pureToken, process.env.SECRETKEY)
        const { rows } = await db.query(`SELECT * FROM public.users WHERE id_users = ${result.userid} ORDER BY id_users ASC`)
        const user = rows[0]
        var tokenNow = null
        const { data } = await db.query(`UPDATE public.users SET token = $1 WHERE id_users = $2 RETURNING *;`, [tokenNow, user.id_users])
        //await user.save()
        res.json(new Response({ message: "sign out success" }, true))
      } catch (e) {
        res.json(new Response({ message: 'token invalid' }, false))
      }
    } else {
      res.json(new Response({ message: 'token invalid' }, false))
    }
  });

  router.get('/utama', isLoggedIn, function (req, res) {
    db.query('SELECT sum(jd.qty * (var.harga_jual_varian - var.harga_beli_varian)) AS profit FROM penjualan_detail jd LEFT JOIN varian var ON var.id_varian = jd.id_varian', (err, profit) => {
      db.query('SELECT sum(total_harga_jual) AS uangmasuk FROM penjualan', (err, uangMasuk) => {
        db.query('SELECT sum(total_harga_beli) AS uangkeluar FROM pembelian', (err, uangKeluar) => {
          //console.log('uangKeluar', uangKeluar.rows[0].uangkeluar)

          //console.log('profit', profit.rows[0].profit)
          db.query(`SELECT no_invoice,tanggal_penjualan FROM penjualan WHERE tanggal_penjualan >= CURRENT_TIMESTAMP - interval '1d'`, (err, jual1d) => {
            db.query(`SELECT no_invoice,tanggal_pembelian FROM pembelian WHERE tanggal_pembelian >= CURRENT_TIMESTAMP - interval '1d'`, (err, beli1d) => {
              db.query(`SELECT count(no_invoice) AS totaljual FROM penjualan`, (err, totaljual) => {
                db.query(`SELECT count(no_invoice) AS totalbeli FROM pembelian`, (err, totalbeli) => {
                  db.query(`SELECT penjualan_detail.id_varian, varian.nama_varian, varian.gambar_varian, barang.nama_barang, penjualan_detail.qty, satuan.nama_satuan FROM public.penjualan_detail LEFT JOIN varian ON penjualan_detail.id_varian = varian.id_varian LEFT JOIN barang ON varian.id_barang = barang.id_barang LEFT JOIN satuan ON varian.id_satuan = satuan.id_satuan ORDER BY qty DESC`, (err, topproduct) => {
                    db.query(`SELECT * FROM public.outlet`, (err, topoutlet) => {
                      res.status(200).json({
                        profit: profit.rows[0].profit,
                        uangMasuk: uangMasuk.rows[0].uangmasuk,
                        uangKeluar: uangKeluar.rows[0].uangkeluar,
                        jualHariIni: jual1d.rows,
                        beliHariIni: beli1d.rows,
                        totaljual: totaljual.rows[0].totaljual,
                        totalbeli: totalbeli.rows[0].totalbeli,
                        topproduct: topproduct.rows,
                        topoutlet: topoutlet.rows,

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