
const fs = require('fs');
const script =  require('../js/script');
const sql = require('mssql');
var config = require('../config/db.config');
const User =  require('../models/user');
const Reply =  require('../models/reply');

exports.createReply = async(req, res, next) => {
  try {
  req.body = JSON.parse(req.body.body)
  console.log( req.body)
      var actual_date = new Date();
      var date = (actual_date.getMonth()+1) + '-' + ( actual_date.getDate() ) + '-' + actual_date.getFullYear();
      // Save Reply in the database
      const reply = await Reply.create({ 
        idUser: req.body.id,
        idCommentReply: req.body.idComment,
        reply: req.body.reply,
        myDate: date,
        });
        res.status(201).json({
          message: reply
        })
    } catch (error) {
      console.log(error)
      /*next(error);
      res.status(500).json({
        message: "Reply was not created"
    });*/
    }
      
      
    }
