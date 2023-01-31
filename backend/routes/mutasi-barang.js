var express = require('express');
var router = express.Router();
var path = require('path');
const { currencyFormatter, isLoggedIn, Response } = require('../helpers/util')

module.exports = function (db) {
	router.get('/barang-keluar', isLoggedIn, async function (req, res, next) {
		try {
			const noInvoice = req.query.noInvoice ? req.query.noInvoice : '';
			const id_outlet = req.query.id_outlet ? req.query.id_outlet : '';

			const { rows } = await db.query('SELECT mb.*, ot.nama_outlet AS penerima, op.nama_outlet AS pengirim FROM mutasi_barang mb LEFT JOIN outlet ot ON mb.id_outlet_penerima = ot.id_outlet LEFT JOIN outlet op ON mb.id_outlet_pengirim = op.id_outlet WHERE id_outlet_pengirim = $1', [id_outlet]);
			//console.log('rows',rows)
			//const noInvoice = req.query.noInvoice ? req.query.noInvoice : rows.length > 0 ? rows[0].no_invoice : '';

			//console.log(req.query.noInvoice, 'noInvoice')
			const details = await db.query('SELECT bmd.*, v.nama_varian FROM barang_mutasi_detail as bmd LEFT JOIN varian as v ON bmd.id_varian = v.id_varian WHERE bmd.no_invoice = $1 ORDER BY bmd.id_detail_barang_mutasi', [noInvoice]);
			const varian = await db.query('SELECT sv.id_varian, v.nama_varian, sv.id_outlet, sv.stok_varian FROM sub_varian as sv LEFT JOIN varian as v ON sv.id_varian = v.id_varian WHERE sv.id_outlet = $1', [id_outlet]);
			const outlet = await db.query('SELECT * FROM outlet WHERE id_outlet != $1 ORDER BY id_outlet', [id_outlet]);
			//const supplier = await db.query('SELECT * FROM supplier ORDER BY id_supplier');
			const print = await db.query('SELECT bmd.*,mb.*,v.nama_varian FROM barang_mutasi_detail as bmd LEFT JOIN varian as v ON bmd.id_varian = v.id_varian LEFT JOIN mutasi_barang as mb ON bmd.no_invoice = mb.no_invoice WHERE bmd.no_invoice = $1', [noInvoice]);
			res.json(new Response({
				barang_keluar: rows,
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
	router.get('/barang-masuk', isLoggedIn, async function (req, res, next) {
		try {
			const noInvoice = req.query.noInvoice ? req.query.noInvoice : '';
			const id_outlet = req.query.id_outlet ? req.query.id_outlet : '';

			const { rows } = await db.query('SELECT mb.*, ot.nama_outlet AS penerima, op.nama_outlet AS pengirim FROM mutasi_barang mb LEFT JOIN outlet ot ON mb.id_outlet_penerima = ot.id_outlet LEFT JOIN outlet op ON mb.id_outlet_pengirim = op.id_outlet WHERE id_outlet_penerima = $1', [id_outlet]);
			//console.log('rows',rows)
			//const noInvoice = req.query.noInvoice ? req.query.noInvoice : rows.length > 0 ? rows[0].no_invoice : '';

			//console.log(req.query.noInvoice, 'noInvoice')
			const details = await db.query('SELECT bmd.*, v.nama_varian FROM barang_mutasi_detail as bmd LEFT JOIN varian as v ON bmd.id_varian = v.id_varian WHERE bmd.no_invoice = $1 ORDER BY bmd.id_detail_barang_mutasi', [noInvoice]);
			const varian = await db.query('SELECT sv.id_varian, v.nama_varian, sv.id_outlet, sv.stok_varian FROM sub_varian as sv LEFT JOIN varian as v ON sv.id_varian = v.id_varian WHERE sv.id_outlet = $1', [id_outlet]);
			const outlet = await db.query('SELECT * FROM outlet WHERE id_outlet != $1 ORDER BY id_outlet', [id_outlet]);
			//const supplier = await db.query('SELECT * FROM supplier ORDER BY id_supplier');
			const print = await db.query('SELECT bmd.*,mb.*,v.nama_varian FROM barang_mutasi_detail as bmd LEFT JOIN varian as v ON bmd.id_varian = v.id_varian LEFT JOIN mutasi_barang as mb ON bmd.no_invoice = mb.no_invoice WHERE bmd.no_invoice = $1', [noInvoice]);
			res.json(new Response({
				barang_masuk: rows,
				//outlet: outlet.rows,
				//supplier: supplier.rows,
				details: details.rows,
				//varian: varian.rows,
				print,
			}));
		} catch (e) {
			console.error(e);
			res.status(500).json(new Response(e, false))
		}

	});


	router.get('/laporan', async function (req, res, next) {
		try {
			const { rows } = await db.query('SELECT barang_mutasi_detail.*, varian.nama_varian, mutasi_barang.tanggal_barang_keluar, mutasi_barang.total_harga_beli, mutasi_barang.total_bayar_beli, mutasi_barang.kembalian_beli FROM public.barang_mutasi_detail LEFT JOIN mutasi_barang ON barang_mutasi_detail.no_invoice = mutasi_barang.no_invoice LEFT JOIN varian ON barang_mutasi_detail.id_varian = varian.id_varian ORDER BY mutasi_barang.tanggal_barang_keluar DESC')
			//res.redirect(`/mutasi_barang/show/${rows[0].no_invoice}`)
			res.json(rows)
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});


	router.post('/create', async function (req, res, next) {
		const id_outlet = req.query.id_outlet ? req.query.id_outlet : '';
		try {
			const { rows } = await db.query('INSERT INTO mutasi_barang(id_outlet_pengirim) VALUES($1) returning *', [id_outlet])
			//res.redirect(`/mutasi_barang/show/${rows[0].no_invoice}`)
			res.json(new Response({ rows: rows[0] }));
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});
	//v

	//v
	router.get('/barang/:id_varian', isLoggedIn, async function (req, res, next) {
		try {
			const id_outlet = req.query.id_outlet ? req.query.id_outlet : '';
			const { rows } = await db.query('SELECT sv.id_varian, sv.stok_varian, v.nama_varian FROM sub_varian sv LEFT JOIN varian v ON sv.id_varian = v.id_varian WHERE sv.id_varian = $1 AND sv.id_outlet = $2 ORDER BY sv.id_varian', [req.params.id_varian, id_outlet])
			res.json(new Response({ rows: rows[0] }));
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});
	//v
	router.post('/additem', async function (req, res, next) {
		try {
			detail = await db.query('INSERT INTO barang_mutasi_detail(no_invoice, id_varian, qty)VALUES ($1, $2, $3) returning *', [req.body.no_invoice, req.body.id_varian, req.body.qty])
			const { rows } = await db.query('SELECT * FROM mutasi_barang WHERE no_invoice = $1', [req.body.no_invoice])
			res.json(new Response({ rows: rows[0] }));
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});
	//v
	router.post('/upbeli', async function (req, res, next) {
		try {
			udatebeli = await db.query('UPDATE mutasi_barang SET id_gudang = $1, id_supplier = $2, id_outlet = $3, total_harga_beli = $4, total_bayar_beli = $5, kembalian_beli = $6 WHERE no_invoice = $7 returning *', [req.body.gudang, req.body.supplier, req.body.outlet, req.body.total_harga_beli, req.body.total_bayar_beli, req.body.kembalian, req.body.no_invoice])
			const { rows } = await db.query('SELECT * FROM mutasi_barang WHERE no_invoice = $1', [req.body.no_invoice])
			res.json(new Response({ rows }));
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});
	//v
	router.get('/details/:no_invoice', isLoggedIn, async function (req, res, next) {
		try {
			const { rows } = await db.query('SELECT bmd.*, v.nama_varian FROM barang_mutasi_detail as bmd LEFT JOIN varian as v ON bmd.id_varian = v.id_varian WHERE bmd.no_invoice = $1 ORDER BY bmd.id_detail_barang_mutasi', [req.params.no_invoice]);
			res.json(new Response({ rows }));
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});

	router.delete('/delete/:no_invoice', isLoggedIn, async function (req, res, next) {
		try {
			const { rows } = await db.query('DELETE FROM mutasi_barang WHERE no_invoice = $1', [req.params.no_invoice])
			delPen = await db.query('DELETE FROM barang_mutasi_detail WHERE no_invoice = $1', [req.params.no_invoice])
			res.redirect('/mutasi_barang')
		} catch (e) {
			console.log(e)
			res.status(500).json(new Response(e, false))
		}
	})

	router.put('/upditem/:id_detail_barang_mutasi', isLoggedIn, async function (req, res, next) {
		try {
			const qty = parseInt(req.body.qty);
			const id = parseInt(req.params.id_detail_barang_mutasi);
			//console.log("updte itm", id,qty, req.body);
			const { rows } = await db.query('UPDATE barang_mutasi_detail SET qty = $1 WHERE id_detail_barang_mutasi = $2', [qty, id])
			// delDetail = await db.query('DELETE FROM barang_mutasi_detail WHERE id_detail_barang_mutasi = $1', [req.params.id_detail_barang_mutasi])
			// const { rows } = await db.query('SELECT SUM(total_harga_detail_beli)  AS total FROM barang_mutasi_detail WHERE no_invoice = $1', [req.body.no_invoice])
			res.json(new Response({ message: "update detail success" }, true))
		} catch (e) {
			console.log(e)
			res.status(500).json(new Response(e, false))
		}
	})

	router.delete('/delitem/:id_detail_barang_mutasi', isLoggedIn, async function (req, res, next) {
		try {
			const { rows } = await db.query('DELETE FROM barang_mutasi_detail WHERE id_detail_barang_mutasi = $1', [req.params.id_detail_barang_mutasi])
			//const { rows } = await db.query('SELECT SUM(total_harga_detail_beli)  AS total FROM barang_mutasi_detail WHERE no_invoice = $1', [req.body.no_invoice])
			res.json(new Response({ message: "delete barang success" }, true))
		} catch (e) {
			console.log(e)
			res.status(500).json(new Response(e, false))
		}
	})

	return router;
}
