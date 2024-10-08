const express = require('express');
const https = require('https');
const devcert = require('devcert');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to handle text/plain requests and parse as JSON if possible
app.use((req, res, next) => {
  if (req.is('text/plain')) {
    let rawData = '';
    req.on('data', (chunk) => {
      rawData += chunk;
    });
    req.on('end', () => {
      try {
        req.body = JSON.parse(rawData);
      } catch (e) {
        req.body = rawData;
      }
      next();
    });
  } else {
    next();
  }
});

app.use((req, res, next) => {
  res.setHeader('Ad-Auction-Allowed', 'true');
  res.setHeader('Supports-Loading-Mode', 'fenced-frame');
  next();
});

app.route('/logger')
  .get((req, res) => {
    console.log('GET /logger - Query Params:', req.query);
    res.status(200).send('Logged GET request with query parameters');
  })
  .post((req, res) => {
    console.log('POST /logger - Payload:', req.body);
    console.log('POST /logger - Query Params:', req.query);
    res.status(200).send('Logged POST request with payload');
  });

app.use(express.static(path.join(__dirname, 'public')));

devcert.certificateFor('localhost').then(ssl => {
  https.createServer(ssl, app).listen(PORT, () => {
    console.log(`Server is running securely on https://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error setting up SSL with devcert:', err);
});
