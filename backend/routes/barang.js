var express = require('express');
var router = express.Router();
const fs = require("fs");

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
      const id_barang = req.query.id_barang ? req.query.id_barang : '';
      const id_outlet = req.query.id_outlet ? req.query.id_outlet : '';
      let reqSQL
      let argumentSQL

      //console.log('out',req.body, req)
      if (id_outlet == '') {
        reqSQL = 'SELECT v.gambar_varian,b.id_barang, b.nama_barang, v.id_varian, v.nama_varian, stok.stok_global, s.nama_satuan, v.harga_beli_varian, v.harga_jual_varian FROM varian as v LEFT JOIN barang as b ON v.id_barang = b.id_barang LEFT JOIN satuan AS s ON v.id_satuan = s.id_satuan LEFT JOIN (SELECT id_varian, sum(stok_varian) AS stok_global FROM sub_varian GROUP  BY 1) stok ON v.id_varian = stok.id_varian WHERE v.id_barang = $1;'
        argumentSQL = [id_barang]
      } else {
        reqSQL = 'SELECT sv.id_sub_varian, v.gambar_varian, b.id_barang, b.nama_barang, v.id_varian, v.nama_varian, sv.stok_varian, s.nama_satuan, o.nama_outlet, v.harga_beli_varian, v.harga_jual_varian FROM sub_varian AS sv  LEFT JOIN varian AS v ON sv.id_varian = v.id_varian LEFT JOIN barang AS b ON v.id_barang = b.id_barang LEFT JOIN outlet AS o ON sv.id_outlet = o.id_outlet LEFT JOIN satuan AS s ON v.id_satuan = s.id_satuan WHERE b.id_barang = $1 AND o.id_outlet = $2'
        argumentSQL = [id_barang, id_outlet]
      }
      db.query(reqSQL, argumentSQL, (err, varian) => {

        if (err) console.log(err)
        db.query(`SELECT count(no_invoice) AS totaljual FROM penjualan`, (err, totaljual) => {
          db.query(`SELECT count(no_invoice) AS totalbeli FROM pembelian`, (err, totalbeli) => {
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

  router.get('/laporan', async function (req, res, next) {
    try {
      const { rows } = await db.query('SELECT v.gambar_varian, b.nama_barang, v.id_varian, v.nama_varian, stok.stok_global, s.nama_satuan, v.harga_beli_varian, v.harga_jual_varian FROM varian as v LEFT JOIN barang as b ON v.id_barang = b.id_barang LEFT JOIN satuan AS s ON v.id_satuan = s.id_satuan LEFT JOIN (SELECT id_varian, sum(stok_varian) AS stok_global FROM sub_varian GROUP  BY 1) stok ON v.id_varian = stok.id_varian')
      //res.redirect(`/penjualan/show/${rows[0].no_invoice}`)
      res.json(rows)
    } catch (e) {
      res.send(e)
    }
  });

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
          // res.render('barang/addvarian', { current: '', barang, satuan, gudang });
          res.status(200).json({ barang, satuan, gudang });
        })
      })
    })
  })

  router.post('/addvarian', async function (req, res, next) {
    try {
      let gambar;
      let uploadPath;
      //console.log('Uploading', req.body,req.body.id_varian, Object.keys(req.body).length, Object.keys(req.body).length > 7);
      // console.log('Uploading', req);
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
      // The name of the input field (i.e. "gambar") is used to retrieve the uploaded file
      gambar = req.files.file;
      const filename = `A${Date.now()}-${gambar.name}`
      uploadPath = path.join(__dirname, '/../public', 'gambar', filename);
      // Use the mv() method to place the file somewhere on your server
      gambar.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        if (Object.keys(req.body).length < 8) {
          console.log('7 body')
          // db.query(`INSERT INTO varian(nama_varian, id_barang,
          //          stok_varian, harga_beli_varian, id_satuan,
          //           id_gudang, gambar_varian, harga_jual_varian) 
          //            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [req.body.nama_varian, req.body.kategori_barang, req.body.stok_varian, req.body.harga_beli, req.body.satuan_varian, req.body.gudang, filename, req.body.harga_jual])
          db.query(`WITH inserted AS (INSERT INTO varian(nama_varian, id_barang,
            stok_varian, harga_beli_varian, id_satuan,
             id_gudang, gambar_varian, harga_jual_varian) 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *) SELECT * FROM inserted LEFT JOIN barang ON inserted.id_barang = barang.id_barang`, [req.body.nama_varian, req.body.kategori_barang, req.body.stok_varian, req.body.harga_beli, req.body.satuan_varian, req.body.gudang, filename, req.body.harga_jual])
            .then((rows) => {
              res.status(200).json(rows.rows[0])
            })
            .catch((err) => {
              res.status(500)
            })

        } else {
          console.log('7 lebih')
          // db.query(`INSERT INTO varian(id_varian ,nama_varian, id_barang,
          //   stok_varian, harga_beli_varian, id_satuan,
          //    id_gudang, gambar_varian, harga_jual_varian) 
          //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [req.body.id_varian, req.body.nama_varian, req.body.kategori_barang, req.body.stok_varian, req.body.harga_beli, req.body.satuan_varian, req.body.gudang, filename, req.body.harga_jual])
          db.query(`WITH inserted AS (INSERT INTO varian(id_varian ,nama_varian, id_barang,
            stok_varian, harga_beli_varian, id_satuan,
             id_gudang, gambar_varian, harga_jual_varian) 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *) SELECT * FROM inserted LEFT JOIN barang ON inserted.id_barang = barang.id_barang`, [req.body.id_varian, req.body.nama_varian, req.body.kategori_barang, req.body.stok_varian, req.body.harga_beli, req.body.satuan_varian, req.body.gudang, filename, req.body.harga_jual])
            .then((rows) => {
              res.status(200).json(rows.rows[0])
            })
            .catch((err) => {
              res.status(500)
            })
        }

      });

    } catch (error) {
      res.send(error)
    }

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
          stok.stok_global,
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
      INNER JOIN gudang gud ON gud.id_gudang = var.id_gudang LEFT JOIN (SELECT id_varian, sum(stok_varian) AS stok_global FROM sub_varian GROUP  BY 1) stok ON var.id_varian = stok.id_varian WHERE var.id_varian = $1`, [req.params.id], (err, rows) => {
            if (err) {
              return console.error(err.message);
            }
            // console.log('rows',rows);
            res.status(200).json({ item: rows.rows[0], barang, satuan, gudang });

          })
        })
      })
    })
  })

  router.post('/editvar/:id', async function (req, res) {

    try {
      let gambar;
      let uploadPath;

      if (!req.files || Object.keys(req.files).length === 0) {
        console.log('gambar lama', req.body.gambar_lama)
        db.query(`UPDATE varian SET nama_varian = $1, id_barang = $2, stok_varian = $3, harga_beli_varian = $4, id_satuan = $5, id_gudang = $6, gambar_varian = $7, harga_jual_varian = $8 WHERE id_varian = $9 RETURNING * `,
          [req.body.nama_varian, req.body.kategori_barang, req.body.stok_varian, req.body.harga_beli, req.body.satuan_varian, req.body.gudang, req.body.gambar_lama, req.body.harga_jual, req.params.id])
          .then((rows) => {
            // console.log('rows',rows.rows[0]);
            res.status(200).json(rows.rows[0])
          })
          .catch((err) => {
            res.status(500)
          })

      } else {
        console.log('gambar baru')
        // The name of the input field (i.e. "gambar") is used to retrieve the uploaded file
        gambar = req.files.file;
        const filename = `A${Date.now()}-${gambar.name}`
        uploadPath = path.join(__dirname, '/../public', 'gambar', filename);
        //uploadPath = path.join(__dirname, '..', 'public, 'gambar', filename);
        // Use the mv() method to place the file somewhere on your server
        gambar.mv(uploadPath, function (err) {
          if (err)
            return res.status(500).send(err);
          //  const {id_varian, nama_barang, barang, stok, harga, satuan, gudang } = req.body

          db.query(`UPDATE varian SET nama_varian = $1, id_barang = $2, stok_varian = $3, harga_beli_varian = $4, id_satuan = $5, id_gudang = $6, gambar_varian = $7, harga_jual_varian = $8 WHERE id_varian = $9 RETURNING *`,
            [req.body.nama_varian,
            req.body.kategori_barang,
            req.body.stok_varian,
            req.body.harga_beli,
            req.body.satuan_varian,
            req.body.gudang,
              filename,
            req.body.harga_jual,
            req.params.id], (err, rows) => {
              if (err) {
                console.log('e', err);
              }
              //console.log('rows',rows);
              res.status(200).json(rows.rows[0])
            })
        })
      }
    } catch (error) {
      res.send(error)
    }
  })

  router.get('/deletevar/:id', isLoggedIn, async function (req, res, next) {
    try {
      const { rows } = await db.query('DELETE FROM varian WHERE id_varian = $1', [req.params.id])

      res.json(rows[0])
    } catch (error) {
      res.json({ error: error })
    }
  })
  //=====================================================
  router.get('/addbarang', isLoggedIn, function (req, res) {
    res.render('barang/addbarang', { currentDir: 'settingdata', current: 'barang' });
  })

  router.post('/addbarang', async function (req, res, next) {
    try {
      const { rows } = await db.query(`INSERT INTO barang(nama_barang) 
      VALUES ($1) RETURNING *`, [req.body.nama_barang])
      res.status(200).json(rows[0])
    } catch (error) {
      res.json({ error: error })
    }

  })

  router.get('/editbar/:id', isLoggedIn, (req, res) => {

    db.query('SELECT * FROM barang WHERE id_barang = $1', [req.params.id], (err, rows) => {

      if (err) {
        return console.error(err.message);
      }
      res.render('barang/editbarang', { item: rows.rows[0] });
    })
  })

  router.post('/editbar/:id', async function (req, res) {
    try {
      const { rows } = await db.query(`UPDATE barang set
      nama_barang = $1
      WHERE id_barang = $2`, [req.body.nama_barang, req.params.id])
      res.json(rows[0])
    } catch (error) {
      res.json({ error: error })
    }
  })

  // router.get('/deletebar/:id', isLoggedIn, async function (req, res, next) {
  //   try {
  //     const { rows } = await db.query('DELETE FROM barang WHERE id_barang = $1', [req.params.id])
  //   } catch (error) {
  //     res.json({ error: error })
  //   }
  // })

  router.get('/deletebar/:id', isLoggedIn, async function (req, res, next) {
    console.log('gambar', req.params.gambar_delete)
    try {
      const { rows } = await db.query('DELETE FROM barang WHERE id_barang = $1', [req.params.id])
      res.json(rows[0])
    } catch (e) {
      res.send(e)
    }
  });

  return router;
}