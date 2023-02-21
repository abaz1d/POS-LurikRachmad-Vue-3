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
				reqSQL = `SELECT no_invoice,tanggal_penjualan FROM penjualan WHERE tanggal_penjualan >= CURRENT_DATE - 14`
				argumentSQL = ''
			} else {
				reqSQL = `SELECT no_invoice,tanggal_penjualan FROM penjualan WHERE tanggal_penjualan >= CURRENT_DATE - 14 AND id_outlet = $1`
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
			const { rows } = await db.query('INSERT INTO retur_penjualan(id_outlet_pengirim) VALUES($1) returning *', [id_outlet])
			res.json(new Response({ rows: rows[0] }));
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});

	router.get('/barang/:id_varian', isLoggedIn, async function (req, res, next) {
		try {
			const id_outlet = req.query.id_outlet ? req.query.id_outlet : '';
			const { rows } = await db.query('SELECT sv.id_varian, sv.stok_varian, v.nama_varian FROM sub_varian sv LEFT JOIN varian v ON sv.id_varian = v.id_varian WHERE sv.id_varian = $1 AND sv.id_outlet = $2 ORDER BY sv.id_varian', [req.params.id_varian, id_outlet])
			res.json(new Response({ rows: rows[0] }));
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});
	router.post('/additem', async function (req, res, next) {
		try {
			detail = await db.query('INSERT INTO retur_penjualan_detail(no_invoice, id_varian, qty)VALUES ($1, $2, $3) returning *', [req.body.no_invoice, req.body.id_varian, req.body.qty])
			const { rows } = await db.query('SELECT * FROM retur_penjualan WHERE no_invoice = $1', [req.body.no_invoice])
			res.json(new Response({ rows: rows[0] }));
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});
	router.post('/upmutasi', async function (req, res, next) {
		const { no_invoice, outlet_penerima, ekspedisi, no_resi } = req.body
		try {
			updatemutasi = await db.query('UPDATE retur_penjualan SET id_outlet_penerima = $1, ekspedisi = $2, no_resi = $3 WHERE no_invoice = $4 returning *', [outlet_penerima, ekspedisi, no_resi, no_invoice])
			const { rows } = await db.query('SELECT rj.*, ot.nama_outlet AS penerima, op.nama_outlet AS pengirim FROM retur_penjualan rj LEFT JOIN outlet ot ON rj.id_outlet_penerima = ot.id_outlet LEFT JOIN outlet op ON rj.id_outlet_pengirim = op.id_outlet WHERE no_invoice = $1', [no_invoice])
			res.json(new Response({ rows }));
		} catch (e) {
			console.error(e);
			res.status(500).json(new Response(e, false))
		}
	});

	router.put('/terima_barang', async (req, res) => {
		const { no_invoice, status  } = req.body
		try {
			let gambar;
			let uploadPath;
			if (!req.files || Object.keys(req.files).length === 0) {
				return res.status(400).json(new Response({ message: 'No files were uploaded.' }, false))
			}
			gambar = req.files.file;
			const filename = `A${Date.now()}-${gambar.name}`
			uploadPath = path.join(__dirname, '..', 'public', 'gambar_bukti', filename);
			// Use the mv() method to place the file somewhere on your server
			gambar.mv(uploadPath, function (err) {
				if (err) throw new Error(err)
				db.query('UPDATE retur_penjualan SET status = $1, gambar_bukti = $2 WHERE no_invoice = $3 returning *', [status, filename, no_invoice])
				.then((rows) => {
					let data = rows.rows
					res.json(new Response({ data }));
				})
				.catch((err) => {
					throw new Error(err)
				})

			})
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});
	router.get('/details/:no_invoice', isLoggedIn, async function (req, res, next) {
		try {
			const { rows } = await db.query('SELECT rjd.*, v.nama_varian FROM retur_penjualan_detail as rjd LEFT JOIN varian as v ON rjd.id_varian = v.id_varian WHERE rjd.id_retur = $1 ORDER BY rjd.id_detail_retur_jual', [req.params.no_invoice]);
			res.json(new Response({ rows }));
		} catch (e) {
			res.status(500).json(new Response(e, false))
		}
	});

	router.delete('/delete/:no_invoice', isLoggedIn, async function (req, res, next) {
		try {
			const { rows } = await db.query('DELETE FROM retur_penjualan WHERE no_invoice = $1', [req.params.no_invoice])
			delPen = await db.query('DELETE FROM retur_penjualan_detail WHERE no_invoice = $1', [req.params.no_invoice])
			//res.redirect('/retur_penjualan')
			res.json(new Response({ message: "delete mutasi success" }, true))
		} catch (e) {
			console.log(e)
			res.status(500).json(new Response(e, false))
		}
	})
	router.put('/upditem/:id_detail_barang_mutasi', isLoggedIn, async function (req, res, next) {
		try {
			const qty = parseInt(req.body.qty);
			const id = parseInt(req.params.id_detail_barang_mutasi);
			const { rows } = await db.query('UPDATE retur_penjualan_detail SET qty = $1 WHERE id_detail_barang_mutasi = $2', [qty, id])
			res.json(new Response({ message: "update detail success" }, true))
		} catch (e) {
			console.log(e)
			res.status(500).json(new Response(e, false))
		}
	})

	router.put('/upd-terima/:id_detail_barang_mutasi', async function (req, res) {
		try {
			const qty_terima = parseInt(req.body.qty_terima);
			const id = parseInt(req.params.id_detail_barang_mutasi);
			const keterangan = req.body.keterangan
			const { rows } = await db.query('UPDATE retur_penjualan_detail SET qty_terima = $1, keterangan = $2 WHERE id_detail_barang_mutasi = $3', [qty_terima, keterangan, id])
			res.json(new Response({ message: "update detail success" }, true))
		} catch (e) {
			console.log(e)
			res.status(500).json(new Response(e, false))
		}
	});

	router.delete('/delitem/:id_detail_barang_mutasi', isLoggedIn, async function (req, res, next) {
		try {
			const { rows } = await db.query('DELETE FROM retur_penjualan_detail WHERE id_detail_barang_mutasi = $1', [req.params.id_detail_barang_mutasi])
			res.json(new Response({ message: "delete item mutasi success" }, true))
		} catch (e) {
			console.log(e)
			res.status(500).json(new Response(e, false))
		}
	})

	return router;
}
