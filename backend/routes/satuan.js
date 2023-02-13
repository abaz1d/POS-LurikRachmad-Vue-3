var express = require('express');
var router = express.Router();
const { isLoggedIn } = require('../helpers/util')
const { Response } = require('../helpers/util')

/* GET home page. */
module.exports = function (db) {

  router.get('/', isLoggedIn, async function (req, res, next) {
    try {
      let sql = 'SELECT * FROM satuan ORDER BY id_satuan'

      const { rows } = await db.query(sql);
      res.json(new Response(rows, true))
    } catch (e) {
      res.status(500).json(new Response(e.toString(), false))
    }
  });
  router.post('/add', async function (req, res, next) {
    try {
      const { rows } = await db.query('INSERT INTO satuan(nama_satuan,keterangan_satuan) VALUES ($1, $2) RETURNING * ',
        [req.body.nama_satuan, req.body.keterangan_satuan])
      res.json(new Response(rows[0], true))
      // res.redirect('/satuan')
    } catch (e) {
      res.status(500).json(new Response(e.toString(), false))
    }
  });
  router.post('/edit/:id', async function (req, res, next) {
    try {
      const { rows } = await db.query(`UPDATE satuan SET 
      nama_satuan = $1,
      keterangan_satuan = $2
      WHERE id_satuan = $3`, [req.body.nama_satuan, req.body.keterangan_satuan, req.params.id])
      res.json(new Response(rows[0], true))
    } catch (e) {
      res.status(500).json(new Response(e.toString(), false))
    }
  });

  router.delete('/delete/:id', isLoggedIn, async function (req, res, next) {
    try {
      const { rows } = await db.query('DELETE FROM satuan WHERE id_satuan = $1', [req.params.id])
      res.json(new Response(rows[0], true))
    } catch (e) {
      res.status(500).json(new Response(e.toString(), false))
    }
  });

  return router;
}