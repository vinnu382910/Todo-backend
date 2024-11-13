const ensureAuthenticated = require('../Middlewares/Auth')
const TaskController = require('../Controllers/TaskController');
const router = require('express').Router();

router.post('/tasks', ensureAuthenticated, TaskController.createTask);    // Create Task
router.get('/tasks', ensureAuthenticated, TaskController.getTasks);       // Get Tasks
router.put('/tasks/:taskId', ensureAuthenticated, TaskController.updateTask); // Update Task
router.delete('/tasks/:taskId', ensureAuthenticated, TaskController.deleteTask); // Delete Task

module.exports = router;