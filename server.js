require('newrelic');
const express = require('express');
const request = require('request');

const EC2_1 = 'http://54.183.230.23';
const EC2_2 = 'http://18.144.27.237';
const servers = [EC2_1, EC2_2];
let current = 0;

const handler = (req, res) => {
  req.pipe(request({ url: servers[current] + req.url })).pipe(res);
  current = (current + 1) % servers.length;
};

const server = express().get('*', handler);

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => console.log(`connected to load balancer at ${PORT}`));
