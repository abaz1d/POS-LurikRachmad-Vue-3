var express = require('express');
var router = express.Router();
var path = require('path');
const { currencyFormatter, isLoggedIn, Response } = require('../helpers/util')

module.exports = function (db) {
    router.get('/', isLoggedIn, async function (req, res, next) {
        try {
            const { cari_inv2, searchStartDate2, searchEndDate2 } = req.query
            let search = []
            let count = 1
            let syntax = []
            let sql_count = 'SELECT count(*) AS total FROM barang'
            let sql = 'SELECT * FROM pembelian'
            if (cari_inv2) {
                sql += ' WHERE '
                sql_count += ' WHERE '
                search.push(`%${cari_inv2}%`)
                syntax.push(`no_invoice ilike '%' || $${count++} || '%'`)
                count++
            }
            if (searchStartDate2 && searchEndDate2) {
                if (!sql.includes(' WHERE ')) {
                    sql += ' WHERE'
                    sql_count += ' WHERE'
                }
                search.push(`${searchStartDate2}`)
                search.push(`${searchEndDate2}`)
                syntax.push(` tanggal_pembelian >= $${count} AND tanggal_pembelian < $${count + 1}`)
                count++
                count++
            } else if (searchStartDate2) {
                if (!sql.includes(' WHERE ')) {
                    sql += ' WHERE'
                    sql_count += ' WHERE'
                }
                search.push(`${searchStartDate2}`)
                syntax.push(` tanggal_pembelian >= $${count}`)
                count++
            } else if (searchEndDate2) {
                if (!sql.includes(' WHERE ')) {
                    sql += ' WHERE'
                    sql_count += ' WHERE'
                }
                search.push(`${searchEndDate2}`)
                syntax.push(` tanggal_pembelian <= $${count}`)
                count++
            }

            if (syntax.length > 0) {
                sql += syntax.join(' AND ')


                sql_count += syntax.join(' AND ')
                sql_count += ` GROUP BY no_invoice ORDER BY id_barang ASC`
            }
            sql += ` ORDER BY tanggal_pembelian DESC`

            const { rows } = await db.query(sql, search);
            //console.log('rows',rows)
            //const noInvoice = req.query.noInvoice ? req.query.noInvoice : rows.length > 0 ? rows[0].no_invoice : '';
            const noInvoice = req.query.noInvoice ? req.query.noInvoice : '';
            console.log(req.query.noInvoice, 'noInvoice')
            const details = await db.query('SELECT dp.*, v.nama_varian FROM pembelian_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian WHERE dp.no_invoice = $1 ORDER BY dp.id_detail_beli', [noInvoice]);
            const varian = await db.query('SELECT var.*, b.id_barang, b.nama_barang FROM varian as var LEFT JOIN barang as b ON var.id_barang = b.id_barang ORDER BY var.id_barang');
            const gudang = await db.query('SELECT * FROM gudang ORDER BY id_gudang');
            const supplier = await db.query('SELECT * FROM supplier ORDER BY id_supplier');
            const print = await db.query('SELECT dp.*,pe.*,v.nama_varian FROM pembelian_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian LEFT JOIN pembelian as pe ON dp.no_invoice = pe.no_invoice WHERE dp.no_invoice = $1', [noInvoice]);
            const totaljual = await db.query(`SELECT count(no_invoice) AS totaljual FROM penjualan`)
            const totalbeli = await db.query(`SELECT count(no_invoice) AS totalbeli FROM pembelian`)
            //console.log('print', print.rows[0].no_invoice)
            // res.render('pembelian/list', {
            //     pembelian: rows,
            //     currencyFormatter,
            //     gudang: gudang.rows,
            //     supplier: supplier.rows,
            //     details: details.rows,
            //     varian: varian.rows,
            //     print,
            //     query: req.query,
            //     totaljual: totaljual.rows[0].totaljual,
            //     totalbeli: totalbeli.rows[0].totalbeli,
            //     user: req.session.user
            // })
            res.status(200).json({
                pembelian: rows,
                currencyFormatter,
                gudang: gudang.rows,
                supplier: supplier.rows,
                details: details.rows,
                varian: varian.rows,
                print,
                query: req.query,
                totaljual: totaljual.rows[0].totaljual,
                totalbeli: totalbeli.rows[0].totalbeli,
                user: req.session.user
            })
        } catch (e) {
            res.send(e)
        }

    });
    //v


    router.get('/laporan', async function (req, res, next) {
        try {
            const { rows } = await db.query('SELECT pembelian_detail.*, varian.nama_varian, pembelian.tanggal_pembelian, pembelian.total_harga_beli, pembelian.total_bayar_beli, pembelian.kembalian_beli FROM public.pembelian_detail LEFT JOIN pembelian ON pembelian_detail.no_invoice = pembelian.no_invoice LEFT JOIN varian ON pembelian_detail.id_varian = varian.id_varian ORDER BY pembelian.tanggal_pembelian DESC')
            //res.redirect(`/pembelian/show/${rows[0].no_invoice}`)
            res.json(rows)
        } catch (e) {
            res.send(e)
        }
    });


    router.post('/create', async function (req, res, next) {
        try {
            const { rows } = await db.query('INSERT INTO pembelian(total_harga_beli) VALUES(0) returning *')
            //res.redirect(`/pembelian/show/${rows[0].no_invoice}`)
            res.json(rows[0])
        } catch (e) {
            res.send(e)
        }
    });
    //v

    //v
    router.get('/barang/:id_varian', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('SELECT var.*, b.id_barang, b.nama_barang FROM varian as var LEFT JOIN barang as b ON var.id_barang = b.id_barang WHERE id_varian = $1 ORDER BY var.id_barang', [req.params.id_varian])
            res.json(rows[0])
        } catch (e) {
            res.send(e)
        }
    });
    //v
    router.post('/additem', async function (req, res, next) {
        try {
            detail = await db.query('INSERT INTO pembelian_detail(no_invoice, id_varian, qty)VALUES ($1, $2, $3) returning *', [req.body.no_invoice, req.body.id_varian, req.body.qty])
            const { rows } = await db.query('SELECT * FROM pembelian WHERE no_invoice = $1', [req.body.no_invoice])
            res.json(rows[0])
        } catch (e) {
            res.send(e)
        }
    });
    //v
    router.post('/upbeli', async function (req, res, next) {
        try {
            udatebeli = await db.query('UPDATE pembelian SET id_gudang = $1, id_supplier = $2, id_outlet = $3, total_harga_beli = $4, total_bayar_beli = $5, kembalian_beli = $6 WHERE no_invoice = $7 returning *', [req.body.gudang, req.body.supplier, req.body.outlet, req.body.total_harga_beli, req.body.total_bayar_beli, req.body.kembalian, req.body.no_invoice])
            const { rows } = await db.query('SELECT * FROM pembelian WHERE no_invoice = $1', [req.body.no_invoice])
            res.json(rows)
        } catch (e) {
            res.send(e)
        }
    });
    //v
    router.get('/details/:no_invoice', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('SELECT dp.*, v.nama_varian FROM pembelian_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian WHERE dp.no_invoice = $1 ORDER BY dp.id_detail_beli', [req.params.no_invoice]);
            res.json(rows)
        } catch (e) {
            res.send(e)
        }
    });

    router.get('/delete/:no_invoice', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('DELETE FROM pembelian WHERE no_invoice = $1', [req.params.no_invoice])
            delPen = await db.query('DELETE FROM pembelian_detail WHERE no_invoice = $1', [req.params.no_invoice])
            res.redirect('/pembelian')
        } catch (e) {
            console.log(e)
            res.render(e)
        }
    })

    router.delete('/delitem/:id_detail_beli', isLoggedIn, async function (req, res, next) {
        try {
            delDetail = await db.query('DELETE FROM pembelian_detail WHERE id_detail_beli = $1', [req.params.id_detail_beli])
            const { rows } = await db.query('SELECT SUM(total_harga_detail_beli)  AS total FROM pembelian_detail WHERE no_invoice = $1', [req.body.no_invoice])
            res.json(rows)
        } catch (e) {
            console.log(e)
        }
    })


    return router;
}
