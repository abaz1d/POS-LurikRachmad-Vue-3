var express = require('express');
var router = express.Router();

var path = require('path');
const { isLoggedIn } = require('../helpers/util')

module.exports = function (db) {

  router.get('/', isLoggedIn, function (req, res) {
    const { cari_id, cari_nama } = req.query
    let search = []
    let count = 1
    let syntax = []
    let sql_count = 'SELECT count(*) AS total FROM barang'
    let sql = 'SELECT * FROM barang'
    if (cari_id) {
      sql += ' WHERE '
      sql_count += ' WHERE '
      search.push(`%${cari_id}%`)
      syntax.push(`id_barang ilike '%' || $${count++} || '%'`)
      count++
    }
    if (cari_nama) {
      if (!sql.includes(' WHERE ')) {
        sql += ' WHERE '
        sql_count += ' WHERE '
      }
      search.push(`%${cari_nama}%`)
      syntax.push(` nama_barang ilike '%' || $${count++} || '%'`)
      count++
    }

    if (syntax.length > 0) {
      sql += syntax.join(' AND ')


      sql_count += syntax.join(' AND ')
      sql_count += ` GROUP BY id_barang ORDER BY id_barang ASC`
    }
    sql += ` ORDER BY id_barang ASC`
    db.query(sql, search, (err, barang) => {
      if (err) console.log(err)
      console.log('sql', sql)
      //const id_barang = req.query.id_barang ? req.query.id_barang : barang.rows.length > 0 ? barang.rows[0].id_barang : '';
      const id_barang = req.query.id_barang ? req.query.id_barang : '';

      db.query('SELECT dp.*, b.nama_barang FROM varian as dp LEFT JOIN barang as b ON dp.id_barang = b.id_barang WHERE dp.id_barang = $1 ORDER BY dp.id_varian ASC', [id_barang], (err, varian) => {
        if (err) console.log(err)
        db.query(`SELECT count(no_invoice) AS totaljual FROM penjualan`, (err, totaljual) => {
          db.query(`SELECT count(no_invoice) AS totalbeli FROM pembelian`, (err, totalbeli) => {
            // res.render('barang/list', {
            //     varian: varian.rows,
            //     rows: barang.rows,
            //     query: req.query,
            //     totaljual: totaljual.rows[0].totaljual,
            //     totalbeli: totalbeli.rows[0].totalbeli,
            //     user: req.session.user
            // });
            res.status(200).json({
              varian: varian.rows,
              barang: barang.rows,
              query: req.query,
              totaljual: totaljual.rows[0].totaljual,
              totalbeli: totalbeli.rows[0].totalbeli,
              user: req.session.user
            })
          })
        })
      })
    })
  })

  router.get('/addvarian', isLoggedIn, function (req, res) {
    db.query('SELECT * FROM barang', (err, rowsB) => {
      if (err) console.log(err)
      db.query('SELECT * FROM satuan', (err, rowsS) => {
        if (err) console.log(err)
        db.query('SELECT * FROM gudang', (err, rowsG) => {
          if (err) console.log(err)
          const barang = rowsB.rows
          const satuan = rowsS.rows
          const gudang = rowsG.rows
          res.render('barang/addvarian', { current: '', barang, satuan, gudang });
        })
      })
    })
  })

  router.post('/addvarian', function (req, res) {
    let gambar;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "gambar") is used to retrieve the uploaded file
    gambar = req.files.gambar;
    const filename = `A${Date.now()}-${gambar.name}`
    uploadPath = path.join(__dirname, '/../public', 'gambar', filename);
    // Use the mv() method to place the file somewhere on your server
    gambar.mv(uploadPath, function (err) {
      if (err)
        return res.status(500).send(err);
      db.query(`INSERT INTO varian(nama_varian, id_barang,
                   stok_varian, harga_beli_varian, id_satuan,
                    id_gudang, gambar_varian, harga_jual_varian) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [req.body.nama_varian, req.body.kategori_barang, req.body.stok_varian, req.body.harga_beli, req.body.satuan_varian, req.body.gudang, filename, req.body.harga_jual], (err) => {
        if (err) {
          return console.error(err.message);
        }
        res.redirect('/barang')
      })



    });

  })

  router.get('/editvar/:id', isLoggedIn, (req, res) => {
    db.query('SELECT * FROM barang', (err, rowsB) => {
      if (err) console.log(err)
      db.query('SELECT * FROM satuan', (err, rowsS) => {
        if (err) console.log(err)
        db.query('SELECT * FROM gudang', (err, rowsG) => {
          if (err) console.log(err)
          const barang = rowsB.rows
          const satuan = rowsS.rows
          const gudang = rowsG.rows
          db.query(`SELECT var.id_varian,
    var.nama_varian,
      bar.id_barang,
    bar.nama_barang,
      var.stok_varian,
      var.harga_beli_varian,
      var.harga_jual_varian,
      sat.id_satuan,
      sat.nama_satuan,
      gud.id_gudang,
      gud.nama_gudang,
      var.gambar_varian
FROM varian var
INNER JOIN barang bar ON bar.id_barang = var.id_barang
INNER JOIN satuan sat ON sat.id_satuan = var.id_satuan
INNER JOIN gudang gud ON gud.id_gudang = var.id_gudang WHERE id_varian = $1;`, [req.params.id], (err, rows) => {
            if (err) {
              return console.error(err.message);
            }
            res.render('barang/editvarian', { item: rows.rows[0], barang, satuan, gudang });

          })
        })
      })
    })
  })

  router.post('/editvar/:id', function (req, res) {

    //const { id_varian, nama, barang, stok, harga, satuan, gudang, saved_gambar, harga_jual } = req.body
    let gambar;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log('gambar lama')
      db.query(`UPDATE varian SET nama_varian = $1, id_barang = $2, stok_varian = $3, harga_beli_varian = $4, id_satuan = $5, id_gudang = $6, gambar_varian = $7, harga_jual_varian = $8 WHERE id_varian = $9`,
        [req.body.nama_varian, req.body.kategori_barang, req.body.stok_varian, req.body.harga_beli, req.body.satuan_varian, req.body.gudang, req.body.saved_gambar, req.body.harga_jual, req.params.id], (err) => {
          if (err) {
            return console.error(err.message);
          }
          res.redirect('/barang')
        })
    } else {
      console.log('gambar baru')
      // The name of the input field (i.e. "gambar") is used to retrieve the uploaded file
      gambar = req.files.gambar;
      const filename = `A${Date.now()}-${gambar.name}`
      uploadPath = path.join(__dirname, '/../public', 'gambar', filename);
      // Use the mv() method to place the file somewhere on your server
      gambar.mv(uploadPath, function (err) {
        if (err)
          return res.status(500).send(err);
        //  const {id_varian, nama, barang, stok, harga, satuan, gudang } = req.body

        db.query(`UPDATE varian SET nama_varian = $1, id_barang = $2, stok_varian = $3, harga_beli_varian = $4, id_satuan = $5, id_gudang = $6, gambar_varian = $7, harga_jual_varian = $8 WHERE id_varian = $9`,
          [req.body.nama_varian,
          req.body.kategori_barang,
          req.body.stok_varian,
          req.body.harga_beli,
          req.body.satuan_varian,
          req.body.gudang,
            filename,
          req.body.harga_jual,
          req.params.id], (err) => {
            if (err) {
              return console.error(err.message);
            }
            res.redirect('/barang')
          })
      })
    }
  })

  router.get('/deletevar/:id', isLoggedIn, (req, res) => {

    db.query('DELETE FROM varian WHERE id_varian = $1', [req.params.id], (err) => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect('/barang')
    })
  })
  //=====================================================
  router.get('/addbarang', isLoggedIn, function (req, res) {
    res.render('barang/addbarang', { currentDir: 'settingdata', current: 'barang' });
  })

  router.post('/addbarang', function (req, res) {
    db.query(`INSERT INTO barang(nama_barang) 
        VALUES ($1)`, [req.body.nama], (err) => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect('/barang')
    })
  })

  router.get('/editbar/:id', isLoggedIn, (req, res) => {

    db.query('SELECT * FROM barang WHERE id_barang = $1', [req.params.id], (err, rows) => {

      if (err) {
        return console.error(err.message);
      }
      res.render('barang/editbarang', { item: rows.rows[0] });
    })
  })

  router.post('/editbar/:id', function (req, res) {
    db.query(`UPDATE barang set
        nama_barang = $1
        WHERE id_barang = $2`, [req.body.nama, req.params.id], (err) => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect('/barang')
    })
  })

  router.get('/deletebar/:id', isLoggedIn, (req, res) => {

    db.query('DELETE FROM barang WHERE id_barang = $1', [req.params.id], (err) => {
      if (err) {
        return console.error(err.message);
      }
      res.redirect('/barang')
    })
  })

  return router;
}