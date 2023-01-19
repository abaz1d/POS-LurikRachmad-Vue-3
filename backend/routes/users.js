var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { isTokenValid, Response } = require('../helpers/util')

/* GET home page. */
module.exports = function (db) {

  router.get('/', isTokenValid, async function (req, res, next) {
    try {
      let wheres = []
      let values = []
      let count = 1

      if (req.query.cari_email) {
        wheres.push(`email_user ilike '%' || $${count++} || '%'`);
        values.push(req.query.cari_email);
      }

      if (req.query.cari_username) {
        wheres.push(`username ilike '%' || $${count++} || '%'`);
        values.push(req.query.cari_username);
      }

      if (req.query.cari_role) {
        wheres.push(`role ilike '%' || $${count++} || '%'`);
        values.push(req.query.cari_role);
      }

      sql = 'SELECT * FROM users '
      if (wheres.length > 0) {
        sql += ` WHERE ${wheres.join(' AND ')}`
      }

      sql += 'ORDER BY id_users'

      const totaljual = await db.query(`SELECT count(no_invoice) AS totaljual FROM penjualan`)
      const totalbeli = await db.query(`SELECT count(no_invoice) AS totalbeli FROM pembelian`)
      const { rows } = await db.query(sql, values);

      res.json(new Response({
        rows,
        user: req.session.user,
        totaljual: totaljual.rows[0].totaljual,
        totalbeli: totalbeli.rows[0].totalbeli,
        query: req.query
      }))
    } catch (e) {
      res.status(500).json(new Response(e, false))
    }
  });

  router.get('/editnotepad/:id', isTokenValid, async function (req, res, next) {
    try {
      const { rows } = await db.query(`SELECT notepad FROM public.users WHERE id_users = $1;`, [req.params.id])
      res.json(new Response(rows[0]))
    } catch (e) {
      res.status(500).json(new Response(e, false))
    }
  });

  router.post('/editnotepad/:id', async function (req, res, next) {
    try {
      //console.log("id note",req.body.notepad)
      const { rows } = await db.query(`UPDATE public.users SET notepad = $1 WHERE id_users = $2 RETURNING notepad;`, [req.body.notepad, req.params.id])
      res.json(new Response(rows[0]))
    } catch (e) {
      res.status(500).json(new Response(e, false))
    }
  });

  router.get('/add', isTokenValid, async function (req, res, next) {
    try {
      res.render('users/register')
    } catch (e) {
      res.status(500).json(new Response(e, false))
    }
  });

  router.post('/add', function (req, res, next) {
//id_outlet- token
    const {email_user, username, password, role} = req.body
    db.query('SELECT * FROM users WHERE email_user = $1', [email_user], (err, email) => {
      
      if (err) return res.status(500).json(new Response(err, false))

      if (email.rows.length > 0) return res.send("email sudah terdaftar")

      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) return res.status(500).json(new Response(err, false))
        db.query('INSERT INTO users(email_user,username,password,role,id_outlet) VALUES ($1, $2, $3, $4, $5) RETURNING *', [email_user, username, hash, role, id_outlet], (err, data) => {
          res.json(new Response({
            data: data[0]
          }))
        })
      })
    })
  });

  router.get('/edit/:id', isTokenValid, async function (req, res, next) {
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE id_users = $1', [req.params.id])
      // res.render('users/edit', { item: rows[0] });
      res.json(new Response({
        data: rows[0]
      }))
    } catch (e) {
      res.status(500).json(new Response(e, false))
    }
  });

  router.post('/edit/:id', isTokenValid, async function (req, res, next) {
    //id_outlet- token
    try {
      const { rows } = await db.query(`UPDATE users SET 
      email_user = $1,
      username = $2,
      role = $3,
      id_outlet = $4
      WHERE id_users = $5 RETURNING *`, [req.body.email_user, req.body.username, req.body.role, req.body.id_outlet, req.params.id])
      res.json(new Response({
        data: rows[0]
      }))
    } catch (e) {
      res.status(500).json(new Response(e, false))
    }
  });

  router.get('/delete/:id', isTokenValid, async function (req, res, next) {
    try {
      const { rows } = await db.query('DELETE FROM users WHERE id_users = $1', [req.params.id])
      res.redirect('/users')
    } catch (e) {
      res.send(e)
    }
  });

  return router;
}