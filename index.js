const express = require('express');
const bodyParser = require('body-parser');
const kargoRuter = require('./routers/kargoRouters')

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(kargoRuter)
// Temel bir GET endpoint'i
app.get('/', (req, res) => {
  res.send('Merhaba, Express uygulamasına hoş geldiniz!');
});

// Dinlenen port
app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} üzerinde çalışıyor.`);
});