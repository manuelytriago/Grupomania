
  // Include Sequelize module.
  const Sequelize = require('sequelize')

  // Import sequelize object,
  // Database connection pool managed by Sequelize.
  const sequelize = require('../config/db.config2')

  const Comment =  require('../models/comment');
  // Define method takes two arguments
  // 1st - name of table
  // 2nd - columns inside the table
  const User = sequelize.define('User', {

      // Column-1, user_id is an object with
      // properties like type, keys,
      // validation of column.
      idUser:{/*Sequelize module has INTEGER Data_Type.*/ type:Sequelize.INTEGER,
          /*To increment user_id automatically.*/autoIncrement:true,
          /* user_id can not be null.*/allowNull:false,
          /* For uniquely identify user.*/primaryKey:true
      },
      // Column-2, lastname
      lastname: { type: Sequelize.STRING, allowNull:false },
      // Column-3, firstname
      firstname: { type: Sequelize.STRING, allowNull:false },
      // Column-4, email
      email: { type: Sequelize.STRING, allowNull:false, unique:true },
      // Column-5, phonenumber
      phonenumber: { type: Sequelize.STRING, allowNull:false },
      // Column-6, phonenumber
      password: { type: Sequelize.STRING, allowNull:false },
      // Column-7 Creation date, default values for
      // dates => current time
      myDate: { type: Sequelize.DATE,
              defaultValue: Sequelize.NOW },
      // Column-8 Creation commentsTags
    tag_posts: { type: Sequelize.STRING, allowNull:true},
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
  })
    
  // Exporting User, using this constant
  // we can perform CRUD operations on
  // 'user' table.
  module.exports = User
