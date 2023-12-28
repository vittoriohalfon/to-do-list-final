const express = require('express');
const router = express.Router();
const tasksService = require('../services/tasksService');

router.get('/', tasksService.getAllTasks);
router.post('/', tasksService.addTask);
router.put('/:id', tasksService.updateTask);
router.delete('/:id', tasksService.deleteTask);

module.exports = router;