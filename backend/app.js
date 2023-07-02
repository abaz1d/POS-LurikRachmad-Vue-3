require("dotenv").config();
const { createProxyMiddleware } = require("http-proxy-middleware");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fileUpload = require("express-fileupload");
var session = require("express-session");
var cors = require("cors");

const { pool } = require("./helpers/util");

// const { Pool } = require('pg')
// Fungsi untuk membuat proxy middleware
function createProxy() {
  return createProxyMiddleware({
    target: "http://153.92.210.7:3000", // Ganti dengan URL backend Anda
    changeOrigin: true,
    secure: false,
  });
}

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
//   // ssl: {
//   //   rejectUnauthorized: false
//   // }
// })
pool.connect((err) => {
  if (err) {
    console.log("e database", err);
  }
  console.log("Connect DB successfully");
});

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

var indexRouter = require("./routes/index")(pool);
var gudangRouter = require("./routes/gudang")(pool);
var satuanRouter = require("./routes/satuan")(pool);
var supplierRouter = require("./routes/supplier")(pool);

var barangRouter = require("./routes/barang")(pool);
var penjualanRouter = require("./routes/penjualan")(pool);
var pembelianRouter = require("./routes/pembelian")(pool);
var usersRouter = require("./routes/users")(pool);
var outletRouter = require("./routes/outlet")(pool);
var pelangganRouter = require("./routes/pelanggan")(pool);

var mutasiBarangRouter = require("./routes/mutasi-barang")(pool);
var returJualRouter = require("./routes/retur-penjualan")(pool);

//var produk = require('./routes/produk') (pool);

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(createProxy());
app.use(fileUpload());
app.use(
  session({
    secret: "apipos",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", indexRouter);
app.use("/gudang", gudangRouter);
app.use("/satuan", satuanRouter);
app.use("/supplier", supplierRouter);
app.use("/barang", barangRouter);
app.use("/penjualan", penjualanRouter);
app.use("/pembelian", pembelianRouter);
app.use("/users", usersRouter);
app.use("/outlet", outletRouter);
app.use("/pelanggan", pelangganRouter);
app.use("/mutasi-barang", mutasiBarangRouter);
app.use("/retur-jual", returJualRouter);

//app.use('/produk', produk);

app.use(allowCrossDomain);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
//     //res.render('pages-404');
//   });

//   // error handler
//   app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     // res.render('error');
//   });

module.exports = app;
