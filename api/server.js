const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// const resourceRouter = require('../resources/resource-router');
// const projectRouter = require('../projects/project-router');

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

// server.use('/api/resources', resourceRouter);
// server.use('/api/projects', projectRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: 'Something is wrong...'
  });
});

module.exports = server;
