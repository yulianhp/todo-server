const Task = require('../models/task.js');

class TaskController {
  static getTasks(req,res){
    Task.find().then(function(data){
      res.status(200)
      .json({
        message: 'Get all tasks',
        dataTasks: data
      })
    })
  }
  
  // static getTasksByUserId(req, res){
  //   Task.findOne(
  //     {}
  //   )
  // }
  
  static addTask(req,res){
    let task = new Task(req.body)
    task.save().then(function(data){
      res.status(200)
      .json({
        message: 'Task added',
        dataTask: data
      })
    }).catch(function(err){
      res.status(400)
      .json({
        message: 'Error create task',
        error: err
      })
    })
  }
  
  static removeTask(req,res){
    Task.findByIdAndRemove(req.params.id).then(function(data){
      res.status(200)
      .json({
        message: 'Task removed',
        dataTasks: data
      })
    }).catch(function(err){
      res.status(400)
      .json({
        message: 'Ada error removeTask',
        error: err
      })
    })
  }
  
  static updateTask(req,res){
    Task.findById(req.params.id).then(function(data){
      data.userId = req.body.userId || data.userId,
      data.description = req.body.description || data.description,
      data.status = req.body.status || data.status
      
      data.save().then(function(data){
        res.status(200)
        .json({
          message: 'Task updated',
          dataBook: data
        })
      }).catch(function(err){
        res.status(400)
        .json({
          message: 'Error update task',
          error: err
        })
      })
    })
  }
  
}

module.exports = TaskController;