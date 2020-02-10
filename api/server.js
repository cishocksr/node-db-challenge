const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const server = express();

server.use(helmet());
server.use(morgan());
server.use(cors());
server.use(express.json());

module.express = server;
