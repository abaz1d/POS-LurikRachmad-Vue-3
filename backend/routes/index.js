var express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var router = express.Router();

var path = require('path');
const { currencyFormatter } = require('../helpers/util')
const { isLoggedIn } = require('../helpers/util')

/* GET home page. */
module.exports = function (db) {
  router.get('/', function (req, res) {
    res.render('login', {
      info: req.flash('info')
    });
  });

  router.post('/', function (req, res) {
    const { email_user, password } = req.body
    db.query('SELECT * FROM users WHERE email_user = $1', [email_user], (err, data) => {
      if (err) {
        console.log(err)
        return res.send(err)
      }

      if (data.rows.length == 0) {
        req.flash('info', 'Email Tidak Terdaftar')
        return res.redirect('/');
      }

      bcrypt.compare(password, data.rows[0].password, function (err, result) {
        if (err) return res.send(err)

        if (!result) {
          req.flash('info', 'Password Salah')
          return res.redirect('/');
        }
        req.session.user = data.rows[0]
        if (req.session.user.role == 'Admin') {
          res.redirect('/utama');
        } else {
          res.redirect('/penjualan');
        }

      });
    })
  });

  router.get('/logout', isLoggedIn, function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/')
    })
  });

  router.get('/utama', isLoggedIn, function (req, res) {
    db.query('SELECT sum(jd.qty * (var.harga_jual_varian - var.harga_beli_varian)) AS profit FROM penjualan_detail jd LEFT JOIN varian var ON var.id_varian = jd.id_varian', (err, profit) => {
      db.query('SELECT sum(total_harga_jual) AS uangmasuk FROM penjualan', (err, uangMasuk) => {
        db.query('SELECT sum(total_harga_beli) AS uangkeluar FROM pembelian', (err, uangKeluar) => {
          //console.log('uangKeluar', uangKeluar.rows[0].uangkeluar)

          //console.log('profit', profit.rows[0].profit)
          db.query(`SELECT count(no_invoice) AS totaljual FROM penjualan`, (err, totaljual) => {
            db.query(`SELECT count(no_invoice) AS totalbeli FROM pembelian`, (err, totalbeli) => {
              db.query(`SELECT penjualan_detail.id_varian, varian.nama_varian, varian.gambar_varian, barang.nama_barang, penjualan_detail.qty, satuan.nama_satuan FROM public.penjualan_detail LEFT JOIN varian ON penjualan_detail.id_varian = varian.id_varian LEFT JOIN barang ON varian.id_barang = barang.id_barang LEFT JOIN satuan ON varian.id_satuan = satuan.id_satuan ORDER BY qty DESC`, (err, topproduct) => {
                db.query(`SELECT * FROM public.outlet`, (err, topoutlet) => {
                  res.status(200).json({
                    profit: profit.rows[0].profit,
                    // query: req.query,
                    uangMasuk: uangMasuk.rows[0].uangmasuk,
                    uangKeluar: uangKeluar.rows[0].uangkeluar,
                    totaljual: totaljual.rows[0].totaljual,
                    totalbeli: totalbeli.rows[0].totalbeli,
                    topproduct: topproduct.rows,
                    topoutlet: topoutlet.rows,
                    user: req.session.user

                  })
                })
              })
            })


          })
        })
      })
    })
  });

  return router;
}