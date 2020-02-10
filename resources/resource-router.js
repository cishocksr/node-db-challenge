const express = require('express');
const Resources = require('./resource-model');

const router = express.Router;

router.get('/', async (req, res, next) => {
  try {
    const resource = await Resources.getAllResources();
    if (resource.length > 0) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: 'There are no resources available' });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const resource = req.body;
    if (!resource.resource_name) {
      res.status(400).json({ message: 'resource name must be included' });
    } else {
      res.status(201).json(await Resources.addResource(resource));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
