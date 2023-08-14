// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Create events
app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://posts-clusterip-srv:4000/events', event); // post service
  axios.post('http://comments-srv:4001/events', event); // comment service
  axios.post('http://query-srv:4002/events', event); // query service
  axios.post('http://moderation-srv:4003/events', event); // moderation service

  res.send({ status: 'OK' });
});

// Listen to port
app.listen(4005, () => {
  console.log('Listening on 4005');
});

