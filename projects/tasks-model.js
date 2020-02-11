const db = require('../data/db-config');

function findTasks(id) {
  return db
    .select('tasks.*')
    .from('tasks')
    .where('tasks.project_id', id);
}

function findTaskById(id) {
  return db('tasks')
    .where({ id })
    .first();
}

function addTask(data) {
  return db('tasks').insert(data);
}

function updateTask(id, data) {
  return db('tasks')
    .where({ id })
    .update(data);
}

function removeTask(id) {
  return db('tasks')
    .where({ id })
    .del();
}

module.exports = {
  findTaskById,
  findTasks,
  addTask,
  updateTask,
  removeTask
};
