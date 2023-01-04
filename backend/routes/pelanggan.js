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
                wheres.push(`id_pelanggan ilike '%' || $${count++} || '%'`);
                values.push(req.query.cari_id);
            }

            if (req.query.cari_nama) {
                wheres.push(`nama_pelanggan ilike '%' || $${count++} || '%'`);
                values.push(req.query.cari_nama);
            }

            if (req.query.cari_alamat) {
                wheres.push(`alamat_pelanggan ilike '%' || $${count++} || '%'`);
                values.push(req.query.cari_alamat);
            }

            if (req.query.cari_kontak) {
                wheres.push(`kontak_pelanggan ilike '%' || $${count++} || '%'`);
                values.push(req.query.cari_kontak);
            }

            sql = 'SELECT * FROM pelanggan '
            if (wheres.length > 0) {
                sql += ` WHERE ${wheres.join(' AND ')}`
            }

            sql += 'ORDER BY id_pelanggan'


            const { rows } = await db.query(sql, values);
            const totaljual = await db.query(`SELECT count(no_invoice) AS totaljual FROM penjualan`)
            const totalbeli = await db.query(`SELECT count(no_invoice) AS totalbeli FROM pembelian`)

            res.status(200).json(rows)
            // res.render('pelanggan/list', {
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
            const { rows } = await db.query('INSERT INTO pelanggan(nama_pelanggan,alamat_pelanggan,kontak_pelanggan) VALUES ($1, $2, $3) RETURNING * ',
                [req.body.nama_pelanggan, req.body.alamat_pelanggan, req.body.kontak_pelanggan])
                res.json(rows[0])
        } catch (e) {
            res.send(e)
        }
    });

    router.post('/edit/:id', async function (req, res, next) {
        try {
            const { rows } = await db.query(`UPDATE pelanggan SET 
      nama_pelanggan = $1,
      alamat_pelanggan = $2,
      kontak_pelanggan = $3
      WHERE id_pelanggan = $4`, [req.body.nama_pelanggan, req.body.alamat_pelanggan, req.body.kontak_pelanggan, req.params.id])
      res.json(rows[0])
        } catch (e) {
            res.send(e)
        }
    });

    router.get('/delete/:id', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('DELETE FROM pelanggan WHERE id_pelanggan = $1', [req.params.id])
            res.json(rows[0])
        } catch (e) {
            res.send(e)
        }
    });

    return router;
}