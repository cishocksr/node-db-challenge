const express = require('express');
const db = require('./resource-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const resources = await db.find();
    res.json(resources);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const resource = await db.findById(id);
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).json({ message: 'Could not find resource with given id' });
  }
  try {
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newresource = await db.add(req.body);
    res.status(201).json(newresource);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const resource = await db.update(id, req.body);
    if (resource) {
      res.json(resource);
    } else {
      res
        .status(404)
        .json({ message: 'Could not find resource with given id' });
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedResource = await db.remove(id);
    console.log(deletedResource);
    if (deletedResource) {
      res.json({ removed: deletedResource });
    } else {
      res
        .status(404)
        .json({ message: 'Could not find resource with given id' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
