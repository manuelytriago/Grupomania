
const Comment =  require('../models/reply');
const fs = require('fs');
const script =  require('../js/script');
const sql = require('mssql');
var config = require('../config/db.config');

exports.createReply = async(req, res, next) => {
  req.body = JSON.parse(req.body.body)
      // Create a Reply
      var actual_date = new Date();
      var fecha = (actual_date.getMonth()+1) + '-' + ( actual_date.getDate() ) + '-' + actual_date.getFullYear();
      const request = new sql.Request();
      request.input('idUser', sql.Int, req.body.id)
      request.input('idComment', sql.NVarChar, req.body.idComment)
      request.input('reply', sql.NVarChar, req.body.reply)
      request.input('date', sql.Date , fecha)

      // Save Comment in the database
      const dataset = await request.query(
          'INSERT INTO [reply] (idComment,idUser,reply,date) OUTPUT Inserted.idReply VALUES (@idComment,@idUser,@reply,@date)');
          const user = dataset;
          console.log("dataset")
          console.log(dataset)
      if (user.rowsAffected == 1) {
        res.status(201).json({
          message: 'comment posted successfully'
        })
      } else {

          console.log("dataset")
          console.log(dataset)
          res.status(500).json({
              message: "User was not created"
          });
      }

      
      
    }
