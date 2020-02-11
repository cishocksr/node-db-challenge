const express = require('express');
const db = require('./project-model');
const resourceDb = require('../resources/resource-model');
const taskDb = require('./tasks-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const projects = await db.find();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const project = await db.findById(id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: 'Could not find project with given id' });
  }
  try {
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newProject = await db.add(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await db.update(id, req.body);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProject = await db.remove(id);
    if (deletedProject) {
      res.json({ removed: deletedProject });
    } else {
      res.status(404).json({ message: 'Could not find project with given id' });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id/tasks', async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await taskDb.findById(id);
    res.json(await taskDb.getTasks(id));
  } catch (err) {
    next(err);
  }
});

router.post('/:id/tasks', async (req, res, next) => {
  try {
    const data = {
      task_description: req.body.task_description,
      task_notes: req.body.task_notes,
      project_id: req.params.id
    };
    const project = await taskDb.findById(req.params.id);
    res.json(await db.addTask(data));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
