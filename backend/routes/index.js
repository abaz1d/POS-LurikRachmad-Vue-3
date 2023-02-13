const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const jwt = require('jsonwebtoken');

const path = require('path');
const { isLoggedIn, Response } = require('../helpers/util')

/* GET home page. */
module.exports = function (db) {
  router.get('/', function (req, res) {
    res.json(new Response({ message: "Halaman Awal" }, true))
  });
  router.post('/auth', async function (req, res) {
    try {
      const { email_user, password } = req.body
      db.query('SELECT * FROM users WHERE email_user = $1', [email_user], (err, data) => {
        if (err) {
          throw new Error(err)
        }

        if (data.rows.length == 0) {
          return res.json(new Response({ message: "unregistered e-mail" }, false))
        }

        bcrypt.compare(password, data.rows[0].password, async function (err, result) {
          if (err) throw new Error(err)

          if (!result) {
            return res.json(new Response({ message: "password doesn't match" }, false))
          }

          //crete token 
          var token = jwt.sign({
            userid: data.rows[0].id_users,
            email: data.rows[0].email_user,
          }, process.env.SECRETKEY);
          const { rows } = await db.query(`WITH updated AS (UPDATE public.users SET token = $1 WHERE id_users = $2 RETURNING *) SELECT * FROM updated LEFT JOIN outlet ON updated.id_outlet = outlet.id_outlet;`, [token, data.rows[0].id_users])
          res.json(new Response({
            userid: rows[0].id_users,
            email: rows[0].email_user,
            username: rows[0].username,
            role: rows[0].role,

            id_outlet: rows[0].id_outlet,
            nama_outlet: rows[0].nama_outlet,
            alamat_outlet: rows[0].alamat_outlet,
            kontak_outlet: rows[0].kontak_outlet,
            token: rows[0].token
          }))
        });
      })
    } catch (error) {
      res.status(500).json(new Response(error, false))
    }
  });

  router.get('/logout', async function (req, res) {
    const token = req.headers.authorization;
    if (token && token.split(' ')[1]) {
      const pureToken = token.split(' ')[1]
      try {
        const result = jwt.verify(pureToken, process.env.SECRETKEY)
        const { rows } = await db.query(`SELECT * FROM public.users WHERE id_users = ${result.userid} ORDER BY id_users ASC`)
        const user = rows[0]
        var tokenNow = null
        const { data } = await db.query(`UPDATE public.users SET token = $1 WHERE id_users = $2 RETURNING *;`, [tokenNow, user.id_users])
        res.json(new Response({ message: "sign out success" }, true))
      } catch (e) {
        res.json(new Response({ message: 'token invalid' }, false))
      }
    } else {
      res.json(new Response({ message: 'token invalid' }, false))
    }
  });

  router.get('/utama', isLoggedIn, async function (req, res) {
    try {
      const id_outlet = req.query.id_outlet ? req.query.id_outlet : '';
      let reqSQL
      let argumentSQL

      db.query('SELECT sum(jd.qty * (var.harga_jual_varian - var.harga_beli_varian)) AS profit FROM penjualan_detail jd LEFT JOIN varian var ON var.id_varian = jd.id_varian', (err, profit) => {
        if (err) return res.status(500).json(new Response(err, false))
        db.query('SELECT sum(total_harga_jual) AS uangmasuk FROM penjualan', (err, uangMasuk) => {
          if (err) return res.status(500).json(new Response(err, false))
          db.query('SELECT sum(total_harga_beli) AS uangkeluar FROM pembelian', (err, uangKeluar) => {
            if (err) return res.status(500).json(new Response(err, false))
            //console.log('uangKeluar', uangKeluar.rows[0].uangkeluar)
            if (id_outlet == '') {
              reqSQL = `SELECT no_invoice,tanggal_penjualan FROM penjualan WHERE tanggal_penjualan >= CURRENT_DATE`
              argumentSQL = ''
            } else {
              reqSQL = `SELECT no_invoice,tanggal_penjualan FROM penjualan WHERE tanggal_penjualan >= CURRENT_DATE AND id_outlet = $1`
              argumentSQL = [id_outlet]
            }
            db.query(reqSQL, argumentSQL, (err, jual1d) => {
              if (err) return res.status(500).json(new Response(err, false))
              if (id_outlet == '') {
                reqSQL = `SELECT no_invoice,tanggal_pembelian FROM pembelian WHERE tanggal_pembelian >= CURRENT_DATE`
                argumentSQL = ''
              } else {
                reqSQL = `SELECT no_invoice,tanggal_pembelian FROM pembelian WHERE tanggal_pembelian >= CURRENT_DATE AND id_outlet = $1`
                argumentSQL = [id_outlet]
              }
              db.query(reqSQL, argumentSQL, (err, beli1d) => {
                if (err) return res.status(500).json(new Response(err, false))
                db.query(`SELECT count(no_invoice) AS totaljual FROM penjualan`, (err, totaljual) => {
                  if (err) return res.status(500).json(new Response(err, false))
                  db.query(`SELECT count(no_invoice) AS totalbeli FROM pembelian`, (err, totalbeli) => {
                    if (err) return res.status(500).json(new Response(err, false))
                    db.query(`SELECT v.id_varian, v.nama_varian, v.gambar_varian, b.nama_barang, s.nama_satuan, sum(pd.qty) as qty FROM penjualan_detail pd LEFT JOIN varian v ON pd.id_varian = v.id_varian LEFT JOIN barang b ON v.id_barang = b.id_barang LEFT JOIN satuan s ON v.id_satuan = s.id_satuan GROUP BY v.id_varian, b.nama_barang, s.nama_satuan ORDER BY qty DESC LIMIT 5`, (err, topproduct) => {
                      if (err) return res.status(500).json(new Response(err, false))
                      db.query(`SELECT o.*, COUNT(p.id_outlet) as total_jual FROM penjualan AS p LEFT JOIN outlet o ON p.id_outlet = o.id_outlet GROUP BY o.id_outlet ORDER BY total_jual DESC LIMIT 5`, (err, topoutlet) => {
                        if (err) return res.status(500).json(new Response(err, false))
                        res.json(new Response({
                          profit: profit.rows[0].profit,
                          uangMasuk: uangMasuk.rows[0].uangmasuk,
                          uangKeluar: uangKeluar.rows[0].uangkeluar,
                          jualHariIni: jual1d.rows,
                          beliHariIni: beli1d.rows,
                          totaljual: totaljual.rows[0].totaljual,
                          totalbeli: totalbeli.rows[0].totalbeli,
                          topproduct: topproduct.rows,
                          topoutlet: topoutlet.rows,

                        }))
                      })
                    })
                  })

                })
              })
            })
          })
        })
      })
    } catch (err) {
      if (err) return res.status(500).json(new Response(err, false))
    }
  });

  return router;
}