var express = require('express');
var router = express.Router();

const { isLoggedIn } = require('../helpers/util')

/* GET home page. */
module.exports = function (db) {

  router.get('/', isLoggedIn, async function (req, res, next) {
    try {
    let wheres = []
    let values = []
    let count = 1

    if (req.query.cari_id) {
      wheres.push(`id_gudang ilike '%' || $${count++} || '%'`);
      values.push(req.query.cari_id);
    }

    if (req.query.cari_nama) {
      wheres.push(`nama_gudang ilike '%' || $${count++} || '%'`);
      values.push(req.query.cari_nama);
    }

    if (req.query.cari_alamat) {
      wheres.push(`alamat_gudang ilike '%' || $${count++} || '%'`);
      values.push(req.query.cari_alamat);
    }

      sql = 'SELECT * FROM gudang'
      if (wheres.length > 0) {
        sql += ` WHERE ${wheres.join(' AND ')}`
      }

      sql += ` ORDER BY id_gudang`

      const totaljual = await db.query(`SELECT count(no_invoice) AS totaljual FROM penjualan`)
      const totalbeli = await db.query(`SELECT count(no_invoice) AS totalbeli FROM pembelian`)
      
      const { rows } = await db.query(sql,values);

      res.render('gudang/list', {
        rows, 
        totaljual: totaljual.rows[0].totaljual,
        totalbeli: totalbeli.rows[0].totalbeli,
        user: req.session.user,
        query: req.query
      })
    } catch (e) {
      res.send(e)
    }
  });

  router.get('/add', isLoggedIn, async function (req, res, next) {
    try {
      res.render('gudang/add')
    } catch (e) {
      res.send(e)
    }
  });

  router.post('/add', async function (req, res, next) {
    try {
      const { rows } = await db.query('INSERT INTO gudang(nama_gudang,alamat_gudang) VALUES ($1, $2)',
        [req.body.nama_gudang, req.body.alamat_gudang])
      res.redirect('/gudang')
    } catch (e) {
      res.send(e)
    }
  });

  router.get('/edit/:id', isLoggedIn, async function (req, res, next) {
    try {
      const { rows } = await db.query('SELECT * FROM gudang WHERE id_gudang = $1', [req.params.id])
      res.render('gudang/edit', { item: rows[0] });
    } catch (e) {
      res.send(e)
    }
  });

  router.post('/edit/:id', async function (req, res, next) {
    try {
      const { rows } = await db.query(`UPDATE gudang SET 
      nama_gudang = $1,
      alamat_gudang = $2
      WHERE id_gudang = $3`, [req.body.nama_gudang, req.body.alamat_gudang, req.params.id])
      res.redirect('/gudang')
    } catch (e) {
      res.send(e)
    }
  });

  router.get('/delete/:id', isLoggedIn, async function (req, res, next) {
    try {
      const { rows } = await db.query('DELETE FROM gudang WHERE id_gudang = $1', [req.params.id])
      res.redirect('/gudang')
    } catch (e) {
      res.send(e)
    }
  });

  return router;
}