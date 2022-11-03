'use strict';

const PORT = 443;

const https = require('https');
const fs = require("fs");
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  console.log('request received');
  console.log(req);

  let cache = [];

  let r = (key, value) => {
    if (key === 'data') {
      return JSON.stringify(value);
    } else if (typeof value === 'object' && value !== null) {
      // Duplicate reference found, discard key
      if (cache.includes(value)) {
        return '...';
      }

      // Store value in our collection
      cache.push(value);
    }
    return value;
  };

  let requestString = JSON.stringify(req.client, r, 2);
  cache = null;

  res.setHeader('Content-Type', 'application/json');

  if (!req.client.authorized) {
    return res.status(401).send('Invalid client certificate authentication:' + requestString);
  }

  return res.send('Client certificate! ' + requestString);
});

https.createServer({
    requestCert: true,
    rejectUnauthorized: false,
    ca: fs.readFileSync('ca.crt'),
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt"),
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