const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { isTokenValid, Response } = require('../helpers/util')

/* GET home page. */
module.exports = function (db) {

  router.get('/', async function (req, res, next) {
    try {
      sql = 'SELECT users.id_users, users.email_user, users.username, users.password, users.role, users.id_outlet, users.notepad, outlet.nama_outlet FROM public.users LEFT JOIN outlet ON users.id_outlet = outlet.id_outlet ORDER BY id_users ASC';

      const outlet = await db.query(`SELECT id_outlet, nama_outlet FROM public.outlet ORDER BY id_outlet ASC `)
      const { rows } = await db.query(sql);

      res.json(new Response({
        rows,
        outlet: outlet.rows,
      }))
    } catch (e) {
      res.status(500).json(new Response(e, false))
    }
  });

  router.get('/editnotepad/:id', async function (req, res, next) {
    try {
      const { rows } = await db.query(`SELECT notepad FROM public.users WHERE id_users = $1;`, [req.params.id])
      res.json(new Response(rows[0]))
    } catch (e) {
      res.status(500).json(new Response(e, false))
    }
  });

  router.post('/editnotepad/:id', async function (req, res, next) {
    try {
      const { rows } = await db.query(`UPDATE public.users SET notepad = $1 WHERE id_users = $2 RETURNING notepad;`, [req.body.notepad, req.params.id])
      res.json(new Response(rows[0]))
    } catch (e) {
      res.status(500).json(new Response(e, false))
    }
  });

  router.get('/add', async function (req, res, next) {
    try {
      res.render('users/register')
    } catch (e) {
      res.status(500).json(new Response(e, false))
    }
  });

  router.post('/add', async function (req, res, next) {
    //id_outlet- token
    try {
      const { email_user, username, password, role, id_outlet } = req.body
      db.query('SELECT * FROM users WHERE email_user = $1', [email_user], (err, email) => {

        if (err) return res.json(new Response({ message: "failed compare emaile" }, false))

        if (email.rows.length > 0) return res.json(new Response({ message: "e-mail has been registered" }, false))

        bcrypt.hash(password, saltRounds, async function (err, hash) {
          if (err) return res.json(new Response({ message: "failed hash" }, false))
          const { rows } = await db.query('WITH inserted AS (INSERT INTO users(email_user,username,password,role,id_outlet) VALUES ($1, $2, $3, $4, $5) RETURNING *) SELECT * FROM inserted LEFT JOIN outlet ON inserted.id_outlet = outlet.id_outlet;', [email_user, username, hash, role, id_outlet])
          if (err) return res.json(new Response({ message: "failed insert" }, false))
          res.json(new Response({
            data: rows[0]
          }))
        })
      })
    } catch (error) {
      res.json(new Response({ message: "failed add user" }, false))
    }
  });

  router.get('/edit/:id', async function (req, res, next) {
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

  router.post('/edit/:id', async function (req, res, next) {
    try {
      if (Object.keys(req.body).length > 4) {
        const { email_user, username, password, role, id_outlet } = req.body
        console.log("password Baru")
        bcrypt.hash(password, saltRounds, async function (err, hash) {
          if (err) return res.json(new Response({ message: "failed hash" }, false))
          const { rows } = await db.query(`WITH updated AS (UPDATE users SET 
          email_user = $1,
          username = $2,
          password = $3,
          role = $4,
          id_outlet = $5
          WHERE id_users = $6 RETURNING *) SELECT * FROM updated LEFT JOIN outlet ON updated.id_outlet = outlet.id_outlet;`, [email_user, username, hash, role, id_outlet, req.params.id])
          res.json(new Response({
            data: rows[0]
          }))
        })
      } else {
        const { email_user, username, role, id_outlet } = req.body
        console.log("Password Lama");
        const { rows } = await db.query(`WITH updated AS (UPDATE users SET 
        email_user = $1,
        username = $2,
        role = $3,
        id_outlet = $4
        WHERE id_users = $5 RETURNING *) SELECT * FROM updated LEFT JOIN outlet ON updated.id_outlet = outlet.id_outlet;`, [email_user, username, role, id_outlet, req.params.id])
        res.json(new Response({
          data: rows[0]
        }))
      }
    } catch (e) {
      res.json(new Response({ message: "failed edit user" }, false))
    }
  });

  router.get('/delete/:id', async function (req, res, next) {
    try {
      const { rows } = await db.query('DELETE FROM users WHERE id_users = $1', [req.params.id])
      res.json(new Response({ message: "Berhasil menghapus User" }, true))
    } catch (e) {
      res.json(new Response({ message: "failed add user" }, false))
    }
  });

  return router;
}