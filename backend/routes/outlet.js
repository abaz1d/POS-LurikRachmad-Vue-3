var express = require('express');
var router = express.Router();
const { currencyFormatter, isLoggedIn, Response } = require('../helpers/util')

/* GET home page. */
module.exports = function (db) {

    router.get('/', isLoggedIn, async function (req, res, next) {
        try {
            sql = 'SELECT * FROM outlet '
            sql += 'ORDER BY id_outlet'

            const { rows } = await db.query(sql);

            res.json(new Response(rows, true))
        } catch (e) {
            res.status(500).json(new Response(e, false))
        }
    });

    router.post('/add', async function (req, res, next) {
        try {
            const { rows } = await db.query('INSERT INTO outlet(nama_outlet,alamat_outlet,kontak_outlet,email_outlet) VALUES ($1, $2, $3, $4) RETURNING * ',
                [req.body.nama_outlet, req.body.alamat_outlet, req.body.kontak_outlet, req.body.email_outlet])
            res.json(new Response(rows[0], true))
        } catch (e) {
            console.error(e)
            res.status(500).json(new Response(e, false))
        }
    });

    router.post('/edit/:id', async function (req, res, next) {
        try {
            const { rows } = await db.query(`UPDATE outlet SET 
      nama_outlet = $1,
      alamat_outlet = $2,
      kontak_outlet = $3,
      email_outlet = $4
      WHERE id_outlet = $5`, [req.body.nama_outlet, req.body.alamat_outlet, req.body.kontak_outlet, req.body.email_outlet, req.params.id])
            res.json(new Response(rows[0], true))
        } catch (e) {
            res.status(500).json(new Response(e, false))
        }
    });

    router.get('/delete/:id', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('DELETE FROM outlet WHERE id_outlet = $1', [req.params.id])
            res.json(new Response(rows[0], true))
        } catch (e) {
            res.status(500).json(new Response(e, false))
        }
    });

    return router;
}