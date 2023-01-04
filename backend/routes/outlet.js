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
                wheres.push(`id_outlet ilike '%' || $${count++} || '%'`);
                values.push(req.query.cari_id);
            }

            if (req.query.cari_nama) {
                wheres.push(`nama_outlet ilike '%' || $${count++} || '%'`);
                values.push(req.query.cari_nama);
            }

            if (req.query.cari_alamat) {
                wheres.push(`alamat_outlet ilike '%' || $${count++} || '%'`);
                values.push(req.query.cari_alamat);
            }

            if (req.query.cari_kontak) {
                wheres.push(`kontak_outlet ilike '%' || $${count++} || '%'`);
                values.push(req.query.cari_kontak);
            }

            sql = 'SELECT * FROM outlet '
            if (wheres.length > 0) {
                sql += ` WHERE ${wheres.join(' AND ')}`
            }

            sql += 'ORDER BY id_outlet'


            const { rows } = await db.query(sql, values);
            const totaljual = await db.query(`SELECT count(no_invoice) AS totaljual FROM penjualan`)
            const totalbeli = await db.query(`SELECT count(no_invoice) AS totalbeli FROM pembelian`)

            res.status(200).json(rows)
            // res.render('outlet/list', {
            //     rows,
            //     user: req.session.user,
            //     totaljual: totaljual.rows[0].totaljual,
            //     totalbeli: totalbeli.rows[0].totalbeli,
            //     query: req.query
            // })
        } catch (e) {
            res.send(e)
        }
    });

    router.post('/add', async function (req, res, next) {
        try {
            const { rows } = await db.query('INSERT INTO outlet(nama_outlet,alamat_outlet,kontak_outlet) VALUES ($1, $2, $3) RETURNING * ',
                [req.body.nama_outlet, req.body.alamat_outlet, req.body.kontak_outlet])
                res.json(rows[0])
        } catch (e) {
            res.send(e)
        }
    });

    router.post('/edit/:id', async function (req, res, next) {
        try {
            const { rows } = await db.query(`UPDATE outlet SET 
      nama_outlet = $1,
      alamat_outlet = $2,
      kontak_outlet = $3
      WHERE id_outlet = $4`, [req.body.nama_outlet, req.body.alamat_outlet, req.body.kontak_outlet, req.params.id])
      res.json(rows[0])
        } catch (e) {
            res.send(e)
        }
    });

    router.get('/delete/:id', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('DELETE FROM outlet WHERE id_outlet = $1', [req.params.id])
            res.json(rows[0])
        } catch (e) {
            res.send(e)
        }
    });

    return router;
}