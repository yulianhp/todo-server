var express = require('express');
var router = express.Router();
const taskController = require('../controller/taskController.js');


router.get('/', taskController.getTasks)
router.post('/add', taskController.addTask)
router.delete('/delete/:id', taskController.removeTask)
router.put('/edit/:id', taskController.updateTask)

module.exports = router;
