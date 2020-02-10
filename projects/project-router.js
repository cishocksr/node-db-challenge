const express = require('express');
const Projects = require('./project-model');
const Resources = require('../resources/resource-model');

const router = express.Router();

// get all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.getAllProjects();
    if (projects.length > 0) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: 'There are no projets in the database' });
    }
  } catch (err) {
    next(err);
  }
});

//add a project
router.post('/', async (req, res, next) => {
  try {
    const project = req.body;
    if (!req.body.project_name) {
      res.status(400).json({ message: 'project_name required please' });
    } else {
      res.status(201).json(await Projects.addProject(project));
    }
  } catch (err) {
    next(err);
  }
});

// project tasks
router.get('/tasks', async (req, res, next) => {
  try {
    const task = await Projects.getTasks(task);
    if (task.length > 0) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'No task associated to this project' });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/tasks', async (req, res, next) => {
  try {
    const task = {
      task_description: req.body.task_description,
      task_notes: req.body.task_notes,
      project_id: req.params.id
    };
    if (!req.body.task_description) {
      res.status(400).json({ message: 'task_description must be included' });
    } else {
      res.json(await Projects.addTask(task));
    }
  } catch (err) {}
});

module.exports = router;
