  // Include Sequelize module.
  const Sequelize = require('sequelize')
  // Import sequelize object,
  // Database connection pool managed by Sequelize.
  const sequelize = require('../config/db.config2')
  const Comment =  require('../models/comment');
  // Define method takes two arguments
  // 1st - name of table
  // 2nd - columns inside the table
  const Reply = sequelize.define('Replie', {

      // Column-1, reply is an object with
      // properties like type, keys,
      // validation of column.
      idReply:{/*Sequelize module has INTEGER Data_Type.*/ type:Sequelize.INTEGER,
          /*To increment reply_id automatically.*/autoIncrement:true,
          /* reply_id can not be null.*/allowNull:false,
          /* For uniquely identify reply.*/primaryKey:true
      },
      idCommentReply:{/*Sequelize module has INTEGER Data_Type.*/ type:Sequelize.INTEGER,
        /* comment_ID can not be null.*/allowNull:false,
        /* For uniquely identify user.*/primaryKey:true
    },
      idUser: {
        type:Sequelize.INTEGER,
        /* user_id can not be null.*/allowNull:false,
        /* For uniquely identify user.*/primaryKey:true
    },
      // Column-2, reply
      reply: { type: Sequelize.STRING, allowNull:false },
      // Column-3, Image
      image: { type: Sequelize.STRING, allowNull:true },
      // Column-4 Createion date, default values for
      // dates => current time
      myDate: { type: Sequelize.DATE,
              defaultValue: Sequelize.NOW },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
  })
  
  Comment.hasMany(Reply, {foreignKey: 'idCommentReply', sourceKey: 'idComment'});
  Reply.belongsTo(Comment, {foreignKey: 'idCommentReply', targetKey: 'idComment'});
  // Exporting Reply, using this constant
  // we can perform CRUD operations on
  // 'Reply' table.
  module.exports = Reply