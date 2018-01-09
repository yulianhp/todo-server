const User = require('../models/user.js');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
require('dotenv').config()

class UserController {
  static register(req,res){
    let newUser = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, saltRounds)
    }
    let customer = new User(newUser)
    customer.save().then(function(data){
      res.status(200)
      .json({
        message: 'User added',
        dataUser: data
      })
    }).catch(function(err){
      res.status(400)
      .json({
        message: 'Error adding customer',
        error: err
      })
    })
  }
  
  static signIn(req, res){
    User.findOne({
      username: req.body.username
    }).then(function(dataUser){
      if(!dataUser){
        res.status(500)
        .json({
          message: 'User tidak ditemukan',
        })
      } else if (!bcrypt.compareSync(req.body.password, dataUser.password)) {
        res.status(403)
        .json({
          message: 'Password tidak cocok'
        })
      } else {
        let objUser = {
          username: dataUser.username,
          userId: dataUser._id,
          role: dataUser.role
        }
        jwt.sign(objUser, process.env.SECRET_KEY, function(err, token){
          if (err) {
            res.status(500)
            .json({
              message: 'Authentication failed'
            })
          } else {
            res.status(200)
            .json({
              message: 'Authentication succeed',
              data: token
            })
          }
        });
      }
      })
      .catch(function(err){
        console.log(err);
        res.status(400)
        .json({
          message: 'Error sign in',
          error: err
        })
      })
  }
  
}

module.exports = UserController;