var express = require('express');
var router = express.Router();
var path = require('path');
const { currencyFormatter, isLoggedIn, Response } = require('../helpers/util')

module.exports = function (db) {
    router.get('/', isLoggedIn, async function (req, res, next) {
        try {
            const noInvoice = req.query.noInvoice ? req.query.noInvoice : '';
            const id_outlet = req.query.id_outlet ? req.query.id_outlet : '';

            const { rows } = await db.query('SELECT * FROM barang_masuk WHERE id_outlet_penerima = $1',[id_outlet]);
            //console.log('rows',rows)
            //const noInvoice = req.query.noInvoice ? req.query.noInvoice : rows.length > 0 ? rows[0].no_invoice : '';
           
            //console.log(req.query.noInvoice, 'noInvoice')
            const details = await db.query('SELECT bmd.*, v.nama_varian FROM barang_masuk_detail as bmd LEFT JOIN varian as v ON bmd.id_varian = v.id_varian WHERE bmd.no_invoice = $1 ORDER BY bmd.id_detail_barang_masuk', [noInvoice]);
            const varian = await db.query('SELECT sv.id_varian, v.nama_varian, sv.id_outlet, sv.stok_varian FROM sub_varian as sv LEFT JOIN varian as v ON sv.id_varian = v.id_varian WHERE sv.id_outlet = $1', [id_outlet]);
            const outlet = await db.query('SELECT * FROM outlet WHERE id_outlet != $1 ORDER BY id_outlet', [id_outlet]);
            //const supplier = await db.query('SELECT * FROM supplier ORDER BY id_supplier');
            const print = await db.query('SELECT bmd.*,bm.*,v.nama_varian FROM barang_masuk_detail as bmd LEFT JOIN varian as v ON bmd.id_varian = v.id_varian LEFT JOIN barang_masuk as bm ON bmd.no_invoice = bm.no_invoice WHERE bmd.no_invoice = $1', [noInvoice]);
            res.json(new Response({
                barang_masuk: rows,
                outlet: outlet.rows,
                //supplier: supplier.rows,
                details: details.rows,
                varian: varian.rows,
                print,
            }));
        } catch (e) {
          console.error(e);
            res.status(500).json(new Response(e, false))
        }

    });
    //v


    router.get('/laporan', async function (req, res, next) {
        try {
            const { rows } = await db.query('SELECT barang_masuk_detail.*, varian.nama_varian, barang_masuk.tanggal_barang_masuk, barang_masuk.total_harga_beli, barang_masuk.total_bayar_beli, barang_masuk.kembalian_beli FROM public.barang_masuk_detail LEFT JOIN barang_masuk ON barang_masuk_detail.no_invoice = barang_masuk.no_invoice LEFT JOIN varian ON barang_masuk_detail.id_varian = varian.id_varian ORDER BY barang_masuk.tanggal_barang_masuk DESC')
            //res.redirect(`/barang_masuk/show/${rows[0].no_invoice}`)
            res.json(rows)
        } catch (e) {
            res.status(500).json(new Response(e, false))
        }
    });


    router.post('/create', async function (req, res, next) {
        try {
            const { rows } = await db.query('INSERT INTO barang_masuk(total_harga_beli) VALUES(0) returning *')
            //res.redirect(`/barang_masuk/show/${rows[0].no_invoice}`)
            res.json(rows[0])
        } catch (e) {
            res.status(500).json(new Response(e, false))
        }
    });
    //v

    //v
    router.get('/barang/:id_varian', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('SELECT var.*, b.id_barang, b.nama_barang FROM varian as var LEFT JOIN barang as b ON var.id_barang = b.id_barang WHERE id_varian = $1 ORDER BY var.id_barang', [req.params.id_varian])
            res.json(rows[0])
        } catch (e) {
            res.status(500).json(new Response(e, false))
        }
    });
    //v
    router.post('/additem', async function (req, res, next) {
        try {
            detail = await db.query('INSERT INTO barang_masuk_detail(no_invoice, id_varian, qty)VALUES ($1, $2, $3) returning *', [req.body.no_invoice, req.body.id_varian, req.body.qty])
            const { rows } = await db.query('SELECT * FROM barang_masuk WHERE no_invoice = $1', [req.body.no_invoice])
            res.json(rows[0])
        } catch (e) {
            res.status(500).json(new Response(e, false))
        }
    });
    //v
    router.post('/upbeli', async function (req, res, next) {
        try {
            udatebeli = await db.query('UPDATE barang_masuk SET id_gudang = $1, id_supplier = $2, id_outlet = $3, total_harga_beli = $4, total_bayar_beli = $5, kembalian_beli = $6 WHERE no_invoice = $7 returning *', [req.body.gudang, req.body.supplier, req.body.outlet, req.body.total_harga_beli, req.body.total_bayar_beli, req.body.kembalian, req.body.no_invoice])
            const { rows } = await db.query('SELECT * FROM barang_masuk WHERE no_invoice = $1', [req.body.no_invoice])
            res.json(rows)
        } catch (e) {
            res.status(500).json(new Response(e, false))
        }
    });
    //v
    router.get('/details/:no_invoice', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('SELECT dp.*, v.nama_varian FROM barang_masuk_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian WHERE dp.no_invoice = $1 ORDER BY dp.id_detail_barang_masuk', [req.params.no_invoice]);
            res.json(rows)
        } catch (e) {
            res.status(500).json(new Response(e, false))
        }
    });

    router.get('/delete/:no_invoice', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('DELETE FROM barang_masuk WHERE no_invoice = $1', [req.params.no_invoice])
            delPen = await db.query('DELETE FROM barang_masuk_detail WHERE no_invoice = $1', [req.params.no_invoice])
            res.redirect('/barang_masuk')
        } catch (e) {
            console.log(e)
            res.status(500).json(new Response(e, false))
        }
    })

    router.delete('/delitem/:id_detail_barang_masuk', isLoggedIn, async function (req, res, next) {
        try {
            delDetail = await db.query('DELETE FROM barang_masuk_detail WHERE id_detail_barang_masuk = $1', [req.params.id_detail_barang_masuk])
            const { rows } = await db.query('SELECT SUM(total_harga_detail_beli)  AS total FROM barang_masuk_detail WHERE no_invoice = $1', [req.body.no_invoice])
            res.json(rows)
        } catch (e) {
            console.log(e)
            res.status(500).json(new Response(e, false))
        }
    })


    return router;
}
