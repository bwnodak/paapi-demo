const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// Load self-signed certificate (generated in Step 1)
const httpsOptions = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt'),
};

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    res.status(200).send('Logged POST request with payload');
  });

app.use(express.static(path.join(__dirname, 'public')));

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server is running securely on https://localhost:${PORT}`);
});
