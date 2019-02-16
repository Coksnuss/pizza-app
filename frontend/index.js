// ----------------
// Imports
// ----------------
const fs = require('fs');
const path = require('path');
const https = require('https');

const express = require('express');
const exphbs  = require('express-handlebars');
const proxy = require('http-proxy-middleware');

const isHelper = require('./handlebars.is.js');

// ----------------
// Config Webserver
// ----------------
const app = express();

// Register handlebars template engine and process .html files with it
// See https://www.npmjs.com/package/express-handlebars for API documentation
app.engine('html', exphbs({
  extname: '.html',
  // defaultLayout: 'main',
  defaultLayout: false,
  helpers: { is: isHelper },
}));
app.set('view engine', 'html');
app.set('views', './htdocs');
const serveHtml = (req, res) => {
  const path = req.originalUrl.substr(1) || 'index.html';
  res.render(path, { path });
};
app.get('/', (req, res) => { serveHtml(req, res); });
app.get(/.*\.html$/, (req, res) => { serveHtml(req, res); });

// Serve files from htdocs under / and files from node_modules under /vendor
app.use(express.static('htdocs'));
app.use('/vendor', express.static('node_modules'));

// Pass requests to /api to the backend (while removing the /api part from the URL)
app.use('/api', proxy({
  target: 'http://[::1]:8080',
  // Use line below when backend listens on IPv4 interface
  // target: 'http://127.0.0.1:8080'
  pathRewrite: {
    '^/api': '',
  },
  // changeOrigin: true
}));

// ----------------
// Init Webserver
// ----------------
// Serve over HTTPS
https.createServer({
  cert: fs.readFileSync(path.join(__dirname, 'dev.tracklog.io.crt')),
  key: fs.readFileSync(path.join(__dirname, 'dev.tracklog.io.key'))
}, app).listen(8000);
// Serve over HTTP
app.listen(8001);

console.log("---- Webserver started! ----");
console.log("https://dev.tracklog.io:8000/");
console.log("http://127.0.0.1:8001/");
console.log("----------------------------");

