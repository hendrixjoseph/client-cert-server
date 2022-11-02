'use strict';

const PORT = 443;

const https = require('https');
const fs = require("fs");
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  if (!req.client.authorized) {
    return res.status(401).send('Invalid client certificate authentication.');
  }

  return res.send('Hello, world!');
});

https.createServer({
    requestCert: true,
    rejectUnauthorized: false,
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
).listen(PORT, () => {
    console.log(`Running on https://localhost:${PORT}`);
});

// redirect http to https
let http = express();

http.get('*', (req, res) =>{
  res.redirect('https://' + req.headers.host + req.url);
});

http.listen(80);