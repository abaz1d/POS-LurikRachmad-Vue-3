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
                wheres.push(`id_supplier ilike '%' || $${count++} || '%'`);
                values.push(req.query.cari_id);
            }

            if (req.query.cari_nama) {
                wheres.push(`nama_supplier ilike '%' || $${count++} || '%'`);
                values.push(req.query.cari_nama);
            }

            if (req.query.cari_alamat) {
                wheres.push(`alamat_supplier ilike '%' || $${count++} || '%'`);
                values.push(req.query.cari_alamat);
            }

            if (req.query.cari_telepon) {
                wheres.push(`telepon_supplier ilike '%' || $${count++} || '%'`);
                values.push(req.query.cari_telepon);
            }

            if (req.query.cari_email) {
                wheres.push(`email_supplier ilike '%' || $${count++} || '%'`);
                values.push(req.query.cari_email);
            }

            sql = 'SELECT * FROM supplier '
            if (wheres.length > 0) {
                sql += ` WHERE ${wheres.join(' AND ')}`
            }

            sql += 'ORDER BY id_supplier'


            const { rows } = await db.query(sql, values);
            const totaljual = await db.query(`SELECT count(no_invoice) AS totaljual FROM penjualan`)
            const totalbeli = await db.query(`SELECT count(no_invoice) AS totalbeli FROM pembelian`)

            res.render('supplier/list', {
                rows,
                user: req.session.user,
                totaljual: totaljual.rows[0].totaljual,
                totalbeli: totalbeli.rows[0].totalbeli,
                query: req.query
            })
        } catch (e) {
            res.send(e)
        }
    });

    router.get('/add', isLoggedIn, async function (req, res, next) {
        try {
            res.render('supplier/add')
        } catch (e) {
            res.send(e)
        }
    });

    router.post('/add', async function (req, res, next) {
        try {
            const { rows } = await db.query('INSERT INTO supplier(nama_supplier,alamat_supplier,telepon_supplier,email_supplier) VALUES ($1, $2, $3, $4)',
                [req.body.nama_supplier, req.body.alamat_supplier, req.body.telepon_supplier , req.body.email_supplier])
                console.log('tlp', req.body.telepon_supplier)
            res.redirect('/supplier')
        } catch (e) {
            res.send(e)
        }
    });

    router.get('/edit/:id', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('SELECT * FROM supplier WHERE id_supplier = $1', [req.params.id])
            res.render('supplier/edit', { item: rows[0] });
        } catch (e) {
            res.send(e)
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
            res.redirect('/supplier')
        } catch (e) {
            res.send(e)
        }
    });

    router.get('/delete/:id', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('DELETE FROM supplier WHERE id_supplier = $1', [req.params.id])
            res.redirect('/supplier')
        } catch (e) {
            res.send(e)
        }
    });

    return router;
}