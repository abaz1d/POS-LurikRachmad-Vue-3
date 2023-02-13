var express = require('express');
var router = express.Router();
const { isLoggedIn, Response } = require('../helpers/util')

/* GET home page. */
module.exports = function (db) {

    router.get('/', isLoggedIn, async function (req, res, next) {
        try {
            let sql = 'SELECT * FROM pelanggan '

            sql += 'ORDER BY id_pelanggan'

            const { rows } = await db.query(sql);

            res.json(new Response(rows, true))
        } catch (e) {
              res.status(500).json(new Response(e.toString(), false))
        }
    });

    router.post('/add', async function (req, res, next) {
        try {
            const { rows } = await db.query('INSERT INTO pelanggan(nama_pelanggan,alamat_pelanggan,kontak_pelanggan) VALUES ($1, $2, $3) RETURNING * ',
                [req.body.nama_pelanggan, req.body.alamat_pelanggan, req.body.kontak_pelanggan])
                res.json(new Response(rows[0], true))
        } catch (e) {
              res.status(500).json(new Response(e.toString(), false))
        }
    });

    router.post('/edit/:id', async function (req, res, next) {
        try {
            const { rows } = await db.query(`UPDATE pelanggan SET 
      nama_pelanggan = $1,
      alamat_pelanggan = $2,
      kontak_pelanggan = $3
      WHERE id_pelanggan = $4`, [req.body.nama_pelanggan, req.body.alamat_pelanggan, req.body.kontak_pelanggan, req.params.id])
      res.json(new Response(rows[0], true))
        } catch (e) {
              res.status(500).json(new Response(e.toString(), false))
        }
    });

    router.delete('/delete/:id', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('DELETE FROM pelanggan WHERE id_pelanggan = $1', [req.params.id])
            res.json(new Response(rows[0], true))
        } catch (e) {
              res.status(500).json(new Response(e.toString(), false))
        }
    });

    return router;
}