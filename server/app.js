const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');
//const proxy = require("http-proxy-middleware");
const axios = require('axios');

const app = express();

app.use(morgan('dev'));
app.use(compression());

app.use(express.static(path.join(__dirname, './../public')));
app.use(express.static(path.join(__dirname, './../node_modules')));


// app.use('/:productSku/reviews',
//   proxy({
//     target: 'http://localhost:3004/',
//     changeOrigin: true
//   })
// );

app.get('/:productSku/similar', (req, res) => {
   axios.get(`http://ec2-54-219-165-96.us-west-1.compute.amazonaws.com:3001/${req.params.productSku }/similar`)
  //axios.get(`http://localhost:3001/${ req.params.productSku }/similar`)
    .then(resp => res.status(200).send(resp.data))
    .catch(err => res.status(500).end(err.message));
});

// app.get('/:productSku/sizes', (req, res) => {
//   axios.get(`http://ec2-18-225-6-210.us-east-2.compute.amazonaws.com:3003/${ req.params.productSku }/sizes`)
//   //axios.get(`http://localhost:3003/${ req.params.productSku }/sizes`)
//     .then(resp => res.status(200).send(resp.data))
//     .catch(err => res.status(500).end(err.message));
// });

// app.get('/:productSku/descrip', (req, res) => {
//   axios.get(`http://ec2-18-225-6-210.us-east-2.compute.amazonaws.com:3003/${ req.params.productSku }/descrip`)
//   //axios.get(`http://localhost:3003/${ req.params.productSku }/descrip`)
//     .then(resp => res.status(200).send(resp.data))
//     .catch(err => res.status(500).end(err.message));
// });

app.get('/:productSku/reviews', (req, res) => {
  axios.get(`http://ec2-3-16-150-245.us-east-2.compute.amazonaws.com:3004/${ req.params.productSku }/reviews`)
  //axios.get(`http://localhost:3004/${ req.params.productSku }/reviews`)
    .then(resp => res.status(200).send(resp.data))
    .catch(err => res.status(500).end(err.message));
});

app.get('/:productSku/images', (req, res) => {
  axios.get(`http://ec2-54-219-162-194.us-west-1.compute.amazonaws.com:3005/${ req.params.productSku }/images`)
    .then(resp => res.status(200).send(resp.data))
    .catch(err => res.status(500).end(err.message));
});

app.get('/:productSku/colors', (req, res) => {
  axios.get(`http://ec2-54-83-182-45.compute-1.amazonaws.com:3000/${ req.params.productSku }/colors`)
    .then(resp => res.status(200).send(resp.data))
    .catch(err => res.status(500).end(err.message));
});

app.get('/:productSku/colors/:style', (req, res) => {
  axios.get(`http://ec2-54-83-182-45.compute-1.amazonaws.com:3000/${ req.params.productSku }/colors/${ req.params.style }`)
    .then(resp => res.status(200).send(resp.data))
    .catch(err => res.status(500).end(err.message));
});

module.exports = app;
