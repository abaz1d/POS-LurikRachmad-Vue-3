var express = require('express');
var router = express.Router();
var path = require('path');
const { currencyFormatter, isLoggedIn, Response } = require('../helpers/util')

module.exports = function (db) {
	router.get('/', isLoggedIn, async function (req, res, next) {
		try {
			const id_retur = req.query.id_retur ? req.query.id_retur : '';
			const id_outlet = req.query.id_outlet ? req.query.id_outlet : '';
			let reqSQL
			let argumentSQL
			if (id_outlet == '') {
				reqSQL = `SELECT rj.*, o.nama_outlet FROM retur_penjualan rj LEFT JOIN outlet o ON rj.id_outlet = o.id_outlet ORDER BY rj.tanggal_pengembalian DESC`
				argumentSQL = ''
			} else {
				reqSQL = `SELECT rj.*, o.nama_outlet FROM retur_penjualan rj LEFT JOIN outlet o ON rj.id_outlet = o.id_outlet WHERE rj.id_outlet = $1 ORDER BY rj.tanggal_pengembalian DESC`
				argumentSQL = [id_outlet]
			}
			const { rows } = await db.query(reqSQL, argumentSQL);
			// const { rows } = await db.query('SELECT rj.*, ot.nama_outlet AS penerima, op.nama_outlet AS pengirim FROM retur_penjualan rj LEFT JOIN outlet ot ON rj.id_outlet = ot.id_outlet WHERE id_outlet = $1 ORDER BY rj.tanggal_pengembalian DESC', [id_outlet]);
			const details = await db.query('SELECT rjd.*, v.nama_varian FROM retur_penjualan_detail as rjd LEFT JOIN varian as v ON rjd.id_varian = v.id_varian WHERE rjd.id_retur = $1 ORDER BY rjd.id_detail_retur_jual', [id_retur]);

			if (id_outlet == '') {
				reqSQL = `SELECT no_invoice,tanggal_penjualan FROM penjualan WHERE tanggal_penjualan >= CURRENT_DATE - 14 ORDER BY no_invoice DESC`
				argumentSQL = ''
			} else {
				reqSQL = `SELECT no_invoice,tanggal_penjualan FROM penjualan WHERE tanggal_penjualan >= CURRENT_DATE - 14 AND id_outlet = $1 ORDER BY no_invoice DESC`
				argumentSQL = [id_outlet]
			}

			const penjualan = await db.query(reqSQL, argumentSQL);
			const varian = await db.query('SELECT sv.*,v.nama_varian, b.id_barang, b.nama_barang FROM sub_varian as sv LEFT JOIN varian v ON sv.id_varian = v.id_varian LEFT JOIN barang as b ON v.id_barang = b.id_barang WHERE sv.id_outlet = $1 ORDER BY b.id_barang', [id_outlet]);
			const print = await db.query('SELECT rjd.*,rj.*,v.nama_varian FROM retur_penjualan_detail as rjd LEFT JOIN varian as v ON rjd.id_varian = v.id_varian LEFT JOIN retur_penjualan as rj ON rjd.id_retur = rj.no_invoice WHERE rjd.id_retur = $1', [id_retur]);
			res.json(new Response({
				pengembalian: rows,
				details: details.rows,
				varian: varian.rows,
				penjualan: penjualan.rows,
				print: print.rows,
			}));
		} catch (e) {
			console.error(e);
			res.status(500).json(new Response(e, false))
		}

	});
	router.get('/read-varians/:no_invoice', isLoggedIn, async function (req, res, next) {
		try {
			const { rows } = await db.query('SELECT dp.*, v.nama_varian, b.id_barang, b.nama_barang FROM penjualan_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian LEFT JOIN barang b ON v.id_barang = b.id_barang WHERE dp.no_invoice = $1 ORDER BY dp.id_detail_jual', [req.params.no_invoice]);
			res.json(new Response(rows, true))
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});
	router.get('/laporan', async function (req, res, next) {
		try {
			const { rows } = await db.query('SELECT retur_penjualan_detail.*, varian.nama_varian, retur_penjualan.tanggal_pengembalian, retur_penjualan.total_harga_beli, retur_penjualan.total_bayar_beli, retur_penjualan.kembalian_beli FROM public.retur_penjualan_detail LEFT JOIN retur_penjualan ON retur_penjualan_detail.no_invoice = retur_penjualan.no_invoice LEFT JOIN varian ON retur_penjualan_detail.id_varian = varian.id_varian ORDER BY retur_penjualan.tanggal_pengembalian DESC')
			res.json(rows)
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});

	router.post('/create', async function (req, res, next) {
		const id_outlet = req.query.id_outlet ? req.query.id_outlet : '';
		try {
			const { rows } = await db.query('INSERT INTO retur_penjualan(id_outlet) VALUES($1) returning *', [id_outlet])
			res.json(new Response(rows));
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});

	router.get('/barang/:id_varian', isLoggedIn, async function (req, res, next) {
		try {
			const no_invoice = req.query.no_invoice ? req.query.no_invoice : '';
			const { rows } = await db.query('SELECT dp.*, v.nama_varian, b.id_barang, b.nama_barang FROM penjualan_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian LEFT JOIN barang b ON v.id_barang = b.id_barang WHERE dp.no_invoice = $1 AND dp.id_varian = $2 ORDER BY dp.id_detail_jual', [no_invoice, req.params.id_varian])
			res.json(new Response(rows, true))
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});
	router.post('/additem', async function (req, res, next) {
		try {
			const { id_retur, id_varian, qty, keterangan } = req.body
			let gambar;
			let uploadPath;
			if (!req.files || Object.keys(req.files).length === 0) {
				return res.status(400).json(new Response({ message: 'No files were uploaded.' }, false))
			}
			gambar = req.files.file;
			const filename = `R${Date.now()}-${gambar.name}`
			uploadPath = path.join(__dirname, '..', 'public', 'gambar_bukti', 'retur_jual', filename);
			// Use the mv() method to place the file somewhere on your server
			gambar.mv(uploadPath, function (err) {
				db.query('INSERT INTO retur_penjualan_detail(id_varian, qty, keterangan, gambar_bukti, id_retur)VALUES ($1, $2, $3, $4, $5) returning *', [id_varian, qty, keterangan, filename, id_retur])
					.then((data) => {
						db.query('SELECT * FROM retur_penjualan WHERE id_retur = $1', [id_retur])
							.then((rows) => {
								res.json(new Response(rows.rows));
							}).catch((err) => {
								throw new Error(err)
							})
					}).catch((err) => {
						throw new Error(err)
					})
			});
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});

	router.post('/upreturjual', async function (req, res, next) {
		const { id_retur, no_invoice } = req.body

		try {
			updateretur = await db.query('UPDATE retur_penjualan SET no_invoice = $1 WHERE id_retur = $2 returning *', [no_invoice, id_retur])
			const { rows } = await db.query('SELECT rj.*, o.nama_outlet FROM retur_penjualan rj LEFT JOIN outlet o ON rj.id_outlet = o.id_outlet WHERE id_retur = $1', [id_retur])
			res.json(new Response(rows));
		} catch (e) {
			console.error(e);
			res.status(500).json(new Response(e, false))
		}
	});

	router.get('/details/:id_retur', isLoggedIn, async function (req, res, next) {
		try {
			const { rows } = await db.query('SELECT rjd.*, v.nama_varian FROM retur_penjualan_detail as rjd LEFT JOIN varian as v ON rjd.id_varian = v.id_varian WHERE rjd.id_retur = $1 ORDER BY rjd.id_detail_retur_jual', [req.params.id_retur]);
			res.json(new Response(rows));
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});

	router.delete('/delete/:id_retur', isLoggedIn, async function (req, res, next) {
		try {
			delPen = await db.query('DELETE FROM retur_penjualan_detail WHERE id_retur = $1', [req.params.id_retur])
			const { rows } = await db.query('DELETE FROM retur_penjualan WHERE id_retur = $1', [req.params.id_retur])

			//res.redirect('/retur_penjualan')
			res.json(new Response({ message: "delete retur success" }, true))
		} catch (e) {
			console.log(e)
			res.status(500).json(new Response(e, false))
		}
	})
	router.put('/upditem/:id_detail_retur_jual', isLoggedIn, async function (req, res, next) {
		try {
			const { id_varian, qty, keterangan } = req.body
			const id = parseInt(req.params.id_detail_retur_jual);
			const { rows } = await db.query('UPDATE retur_penjualan_detail SET id_varian = $1, qty = $2, keterangan = $3 WHERE id_detail_retur_jual = $4', [id_varian, parseInt(qty), keterangan, id])
			res.json(new Response({ message: "update detail success" }, true))
		} catch (e) {
			console.log(e)
			res.status(500).json(new Response(e, false))
		}
	})
	router.delete('/delitem/:id_detail_retur_jual', isLoggedIn, async function (req, res, next) {
		try {
			const { rows } = await db.query('DELETE FROM retur_penjualan_detail WHERE id_detail_retur_jual = $1', [req.params.id_detail_retur_jual])
			res.json(new Response({ message: "delete item retur success" }, true))
		} catch (e) {
			console.log(e)
			res.status(500).json(new Response(e, false))
		}
	})

	return router;
}
