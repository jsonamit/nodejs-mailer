const express = require('express');
const http = require('http');
const config = require('./config/express');
const conn = require('./conn/db');

const app = express();
config(app);

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
