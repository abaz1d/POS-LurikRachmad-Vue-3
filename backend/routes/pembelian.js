var express = require('express');
var router = express.Router();
var path = require('path');
const { isLoggedIn, Response } = require('../helpers/util')

module.exports = function (db) {
    router.get('/', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query(`SELECT * FROM pembelian ORDER BY no_invoice DESC`);
            const noInvoice = req.query.noInvoice ? req.query.noInvoice : '';
            const details = await db.query('SELECT dp.*, v.nama_varian FROM pembelian_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian WHERE dp.no_invoice = $1 ORDER BY dp.id_detail_beli', [noInvoice]);
            const varian = await db.query('SELECT var.*, b.id_barang, b.nama_barang FROM varian as var LEFT JOIN barang as b ON var.id_barang = b.id_barang ORDER BY var.id_barang');
            const supplier = await db.query('SELECT * FROM supplier ORDER BY id_supplier');
            const print = await db.query('SELECT dp.*,pe.*,v.nama_varian FROM pembelian_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian LEFT JOIN pembelian as pe ON dp.no_invoice = pe.no_invoice WHERE dp.no_invoice = $1', [noInvoice]);

            res.json(new Response({
                pembelian: rows,
                supplier: supplier.rows,
                details: details.rows,
                varian: varian.rows,
                print,
            }))
        } catch (e) {
            res.status(500).json(new Response(e.toString(), false))
        }

    });


    router.get('/laporan', async function (req, res, next) {
        try {
            const { rows } = await db.query('SELECT pembelian_detail.*, varian.nama_varian, pembelian.tanggal_pembelian, pembelian.total_harga_beli, pembelian.total_bayar_beli, pembelian.kembalian_beli FROM public.pembelian_detail LEFT JOIN pembelian ON pembelian_detail.no_invoice = pembelian.no_invoice LEFT JOIN varian ON pembelian_detail.id_varian = varian.id_varian ORDER BY pembelian.tanggal_pembelian DESC')
            res.json(new Response(rows, true))
        } catch (e) {
            res.status(500).json(new Response(e.toString(), false))
        }
    });


    router.post('/create', async function (req, res, next) {
        try {
            const { rows } = await db.query('INSERT INTO pembelian(total_harga_beli) VALUES(0) returning *')
              res.json(new Response(rows[0], true))
        } catch (e) {
            res.status(500).json(new Response(e.toString(), false))
        }
    });

    router.get('/barang/:id_varian', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('SELECT var.*, b.id_barang, b.nama_barang FROM varian as var LEFT JOIN barang as b ON var.id_barang = b.id_barang WHERE id_varian = $1 ORDER BY var.id_barang', [req.params.id_varian])
              res.json(new Response(rows[0], true))
        } catch (e) {
            res.status(500).json(new Response(e.toString(), false))
        }
    });
    router.post('/additem', async function (req, res, next) {
        try {
            detail = await db.query('INSERT INTO pembelian_detail(no_invoice, id_varian, qty)VALUES ($1, $2, $3) returning *', [req.body.no_invoice, req.body.id_varian, req.body.qty])
            const { rows } = await db.query('SELECT * FROM pembelian WHERE no_invoice = $1', [req.body.no_invoice])
            res.json(new Response(rows[0], true))
        } catch (e) {
            res.status(500).json(new Response(e.toString(), false))
        }
    });
    router.post('/upbeli', async function (req, res, next) {
        try {
            udatebeli = await db.query('UPDATE pembelian SET id_supplier = $1, total_harga_beli = $2, total_bayar_beli = $3, kembalian_beli = $4 WHERE no_invoice = $5 returning *', [req.body.supplier, req.body.total_harga_beli, req.body.total_bayar_beli, req.body.kembalian, req.body.no_invoice])
            const { rows } = await db.query('SELECT * FROM pembelian WHERE no_invoice = $1', [req.body.no_invoice])
            res.json(new Response(rows, true))
        } catch (e) {
            res.status(500).json(new Response(e.toString(), false))
        }
    });
    router.get('/details/:no_invoice', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('SELECT dp.*, v.nama_varian FROM pembelian_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian WHERE dp.no_invoice = $1 ORDER BY dp.id_detail_beli', [req.params.no_invoice]);
            res.json(new Response(rows, true))
        } catch (e) {
            res.status(500).json(new Response(e.toString(), false))
        }
    });

    router.get('/delete/:no_invoice', isLoggedIn, async function (req, res, next) {
        try {
            delPen = await db.query('DELETE FROM pembelian_detail WHERE no_invoice = $1', [req.params.no_invoice])
            const { rows } = await db.query('DELETE FROM pembelian WHERE no_invoice = $1', [req.params.no_invoice])
            res.json(new Response({ message: "delete barang success" }, true))
        } catch (e) {
            console.log(e)
            res.status(500).json(new Response(e.toString(), false))
        }
    })
    router.put('/upditem/:id_detail_beli', isLoggedIn, async function (req, res, next) {
        try {
            const qty = parseInt(req.body.qty);
            const id = parseInt(req.params.id_detail_beli);
            //console.log("updte itm", id,qty, req.body);
            const detail = await db.query('WITH updated AS (UPDATE pembelian_detail SET qty = $1 WHERE id_detail_beli = $2 RETURNING *) SELECT updated.*, v.nama_varian FROM updated LEFT JOIN varian v ON updated.id_varian = v.id_varian', [qty, id])
            const { rows } = await db.query('SELECT * FROM pembelian WHERE no_invoice = $1', [req.body.no_invoice])
            //console.log("updte itm", rows, detail.rows[0]);
            res.json(new Response({ rows, detail: detail.rows[0] }, true))
        } catch (e) {
            console.log(e)
            res.status(500).json(new Response(e.toString(), false))
        }
    })

    router.delete('/delitem/:id_detail_beli', isLoggedIn, async function (req, res, next) {
        try {
            delDetail = await db.query('DELETE FROM pembelian_detail WHERE id_detail_beli = $1', [req.params.id_detail_beli])
            const { rows } = await db.query('SELECT SUM(total_harga_detail_beli)  AS total FROM pembelian_detail WHERE no_invoice = $1', [req.body.no_invoice])
            res.json(new Response(rows, true))
        } catch (e) {
            res.status(500).json(new Response(e.toString(), false))
        }
    })


    return router;
}
