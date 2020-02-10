const db = require('../data/db-config');

function getAllProjects() {
  return db('projects');
}

function addProject(data) {
  return db('projects').insert(data);
}

function getTasks() {
  return db
    .select('tasks')
    .from('tasks')
    .where('tasks.project_id', id);
}

function addTask(data) {
  return db('tasks').insert(data);
}

module.exports = {
  getAllProjects,
  addProject,
  getTasks,
  addTask
};
