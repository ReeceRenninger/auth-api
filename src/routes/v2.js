'use strict';

const express = require('express');
const dataModules = require('../models');
const acl = require('../auth/middleware/acl');
const bearerAuth = require('../auth/middleware/bearer');
const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', bearerAuth, handleGetAll);
router.get('/:model/:id', bearerAuth,  handleGetOne);
router.post('/:model', bearerAuth, acl('create'), handleCreate); // had as update by mistake
router.put('/:model/:id', bearerAuth, acl('update'), handleUpdate);
router.patch('/:model/:id', bearerAuth, acl('update'),handleUpdate);
router.delete('/:model/:id', bearerAuth, acl('delete'), handleDelete);

async function handleGetAll(req, res, next) {
  try {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
    
  } catch (error) {
    next(error.message || 'Error in getting ALL records', error);
  }
}

async function handleGetOne(req, res, next) {
  try {
    const id = req.params.id;
    let theRecord = await req.model.get(id);
    res.status(200).json(theRecord);
    
  } catch (error) {
    next(error.message || 'Error in grabbing one record', error);
  }
}

async function handleCreate(req, res, next) {
  try {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
    
  } catch (error) {
    next(error.message || 'Error in creating a record', error);
  }
}

async function handleUpdate(req, res, next) {
  try {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
    
  } catch (error) {
    next(error.message || 'Error in updating a record', error);
  }
}

async function handleDelete(req, res, next) {
  try {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
    
  } catch (error) {
    next(error.message || 'Error in deleting a record', error);
  }
}


module.exports = router;