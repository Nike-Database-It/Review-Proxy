const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 3000;

const routes = {
  similar: 3001,
  sizes: 3003,
  reviews: 3004,
  images: 3005,
  colors: 3006,
}

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/:shoeID/:service', (req, res) => {
  const { shoeID } = req.params;
  const { service } = req.params;
  const URL = `http://localhost:${routes[service]}/${shoeID}/${service}`;
  console.log('outgoing URL :', URL);
  axios.get(URL)
  .then(function (response) {
    console.log(`proxy recieved response for ${routes[service]}/${shoeID}/${service}`);
    res.send(response.data).end();
  })
  .catch(function (error) {
    console.log(error);
  });
});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
