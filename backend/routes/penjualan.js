var express = require('express');
var router = express.Router();
var path = require('path');
const { currencyFormatter } = require('../helpers/util')
const { isLoggedIn } = require('../helpers/util')

module.exports = function (db) {
    router.get('/', isLoggedIn, async function (req, res, next) {
        try {
            const { cari_inv, searchStartDate, searchEndDate } = req.query
            let search = []
            let count = 1
            let syntax = []
            let sql_count = 'SELECT count(*) AS total FROM barang'
            let sql = 'SELECT * FROM penjualan'
            if (cari_inv) {
                sql += ' WHERE '
                sql_count += ' WHERE '
                search.push(`%${cari_inv}%`)
                syntax.push(`no_invoice ilike '%' || $${count++} || '%'`)
                count++
            }
            if (searchStartDate && searchEndDate) {
                if (!sql.includes(' WHERE ')) {
                    sql += ' WHERE'
                    sql_count += ' WHERE'
                }
                search.push(`${searchStartDate}`)
                search.push(`${searchEndDate}`)
                syntax.push(` tanggal_penjualan >= $${count} AND tanggal_penjualan < $${count + 1}`)
                count++
                count++
            } else if (searchStartDate) {
                if (!sql.includes(' WHERE ')) {
                    sql += ' WHERE'
                    sql_count += ' WHERE'
                }
                search.push(`${searchStartDate}`)
                syntax.push(` tanggal_penjualan >= $${count}`)
                count++
            } else if (searchEndDate) {
                if (!sql.includes(' WHERE ')) {
                    sql += ' WHERE'
                    sql_count += ' WHERE'
                }
                search.push(`${searchEndDate}`)
                syntax.push(` tanggal_penjualan <= $${count}`)
                count++
            }

            if (syntax.length > 0) {
                sql += syntax.join(' AND ')


                sql_count += syntax.join(' AND ')
                sql_count += ` GROUP BY no_invoice ORDER BY id_barang ASC`
            }
            sql += ` ORDER BY tanggal_penjualan DESC`

            const { rows } = await db.query(sql, search);
            //console.log('rows',rows)
            //const noInvoice = req.query.noInvoice ? req.query.noInvoice : rows.length > 0 ? rows[0].no_invoice : '';
            const noInvoice = req.query.noInvoice ? req.query.noInvoice : '';
            console.log(req.query.noInvoice, 'noInvoice')
            const details = await db.query('SELECT dp.*, v.nama_varian FROM penjualan_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian WHERE dp.no_invoice = $1 ORDER BY dp.id_detail_jual', [noInvoice]);
            const varian = await db.query('SELECT var.*, b.id_barang, b.nama_barang FROM varian as var LEFT JOIN barang as b ON var.id_barang = b.id_barang ORDER BY var.id_barang');
            const print = await db.query('SELECT dp.*,pe.*, v.nama_varian, b.nama_barang FROM penjualan_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian LEFT JOIN barang as b ON b.id_barang = v.id_barang LEFT JOIN penjualan as pe ON dp.no_invoice = pe.no_invoice WHERE dp.no_invoice = $1', [noInvoice]);
            const totaljual = await db.query(`SELECT count(no_invoice) AS totaljual FROM penjualan`)
            const totalbeli = await db.query(`SELECT count(no_invoice) AS totalbeli FROM pembelian`)
            //console.log('print', print.rows[0].no_invoice)
            // res.render('penjualan/list', {
            //     penjualan: rows,
            //     moment,
            //     currencyFormatter,
            //     details: details.rows,
            //     varian: varian.rows,
            //     print,
            //     query: req.query,
            //     totaljual: totaljual.rows[0].totaljual,
            //     totalbeli: totalbeli.rows[0].totalbeli,
            //     user: req.session.user
            // })
            res.status(200).json({
                penjualan: rows,
                currencyFormatter,
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
            const { rows } = await db.query('SELECT penjualan_detail.*, varian.nama_varian, penjualan.tanggal_penjualan, penjualan.total_harga_jual, penjualan.total_bayar_jual, penjualan.kembalian_jual FROM public.penjualan_detail LEFT JOIN penjualan ON penjualan_detail.no_invoice = penjualan.no_invoice LEFT JOIN varian ON penjualan_detail.id_varian = varian.id_varian ORDER BY penjualan.tanggal_penjualan DESC')
            //res.redirect(`/penjualan/show/${rows[0].no_invoice}`)
            res.json(rows)
        } catch (e) {
            res.send(e)
        }
    });
    //v

    router.post('/create', async function (req, res, next) {
        try {
            const { rows } = await db.query('INSERT INTO penjualan(total_harga_jual) VALUES(0) returning *')
            //res.redirect(`/penjualan/show/${rows[0].no_invoice}`)
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
            detail = await db.query('INSERT INTO penjualan_detail(no_invoice, id_varian, qty)VALUES ($1, $2, $3) returning *', [req.body.no_invoice, req.body.id_varian, req.body.qty])
            const { rows } = await db.query('SELECT * FROM penjualan WHERE no_invoice = $1', [req.body.no_invoice])
            res.json(rows[0])
        } catch (e) {
            res.send(e)
        }
    });
    //v
    router.post('/upjual', async function (req, res, next) {
        try {
            udatejual = await db.query('UPDATE penjualan SET total_harga_jual = $1, total_bayar_jual = $2, kembalian_jual = $3 WHERE no_invoice = $4 returning *', [req.body.total_harga_jual, req.body.total_bayar_jual, req.body.kembalian, req.body.no_invoice])
            const { rows } = await db.query('SELECT * FROM penjualan WHERE no_invoice = $1', [req.body.no_invoice])
            res.json(rows)
        } catch (e) {
            res.send(e)
        }
    });
    //v
    router.get('/details/:no_invoice', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('SELECT dp.*, v.nama_varian FROM penjualan_detail as dp LEFT JOIN varian as v ON dp.id_varian = v.id_varian WHERE dp.no_invoice = $1 ORDER BY dp.id_detail_jual', [req.params.no_invoice]);
            res.json(rows)
        } catch (e) {
            res.send(e)
        }
    });

    router.get('/delete/:no_invoice', isLoggedIn, async function (req, res, next) {
        try {
            const { rows } = await db.query('DELETE FROM penjualan WHERE no_invoice = $1', [req.params.no_invoice])
            delPen = await db.query('DELETE FROM penjualan_detail WHERE no_invoice = $1', [req.params.no_invoice])
            res.redirect('/penjualan')
        } catch (e) {
            console.log(e)
            res.render(e)
        }
    })

    router.delete('/delitem/:id_detail_jual', isLoggedIn, async function (req, res, next) {
        try {
            delDetail = await db.query('DELETE FROM penjualan_detail WHERE id_detail_jual = $1', [req.params.id_detail_jual])
            const { rows } = await db.query('SELECT SUM(total_harga_detail_jual)  AS total FROM penjualan_detail WHERE no_invoice = $1', [req.body.no_invoice])
            res.json(rows)
        } catch (e) {
            console.log(e)
        }
    })


    return router;
}
