var express = require('express');
var router = express.Router();
const { isLoggedIn, Response } = require('../helpers/util')

/* GET home page. */
module.exports = function (db) {

    router.get('/', isLoggedIn, async function (req, res, next) {
        try {
            let sql = 'SELECT * FROM supplier ORDER BY id_supplier'
            const { rows } = await db.query(sql);
            res.json(new Response(rows, true))
        } catch (e) {
             res.status(500).json(new Response(e.toString(), false))
        }
    });
    router.post('/add', async function (req, res, next) {
        try {
            const { rows } = await db.query('INSERT INTO supplier(nama_supplier,alamat_supplier,telepon_supplier,email_supplier) VALUES ($1, $2, $3, $4) RETURNING * ',
                [req.body.nama_supplier, req.body.alamat_supplier, req.body.telepon_supplier , req.body.email_supplier])
                res.json(new Response(rows[0], true))
        } catch (e) {
             res.status(500).json(new Response(e.toString(), false))
        }
    });
    router.post('/edit/:id', async function (req, res, next) {
        try {
            const { rows } = await db.query(`UPDATE supplier SET 
      nama_supplier = $1,
      alamat_supplier = $2,
      telepon_supplier = $3,
      email_supplier = $4
      WHERE id_supplier = $5`, [req.body.nama_supplier, req.body.alamat_supplier, req.body.telepon_supplier , req.body.email_supplier, req.params.id])
      res.json(new Response(rows[0], true))
        } catch (e) {
             res.status(500).json(new Response(e.toString(), false))
        }
    });

    router.delete('/delete/:id', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('DELETE FROM supplier WHERE id_supplier = $1', [req.params.id])
            res.json(new Response(rows[0], true))
        } catch (e) {
             res.status(500).json(new Response(e.toString(), false))
        }
    });

    return router;
}