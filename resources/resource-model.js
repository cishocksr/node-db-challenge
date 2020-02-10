const db = require('../data/db-config');

function getAllResources() {
  return db('resources');
}

function addResource(data) {
  return db('resources').insert(data);
}

module.exports = {
  getAllResources,
  addResource
};
