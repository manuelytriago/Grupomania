
/*const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const commentSchema = mongoose.Schema({
userId:{type: String, required: true},
comment:{type: String, required: true},
date:{type: Date, required: true},
imageUrl:{type: [String], required: false},
videUrl:{type: [String], required: false}
});
//commentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Comment', commentSchema);
*/

class User{
    constructor(Id, Comment, Date, imageUrl, videUrl){
        this.userId = Id
        this.comment = Comment   
        this.Date = Date   
        this.imageUrl = imageUrl  
        this.videUrl = imageUrl  

    }
}
module.exports = User;

/*
module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("Comment", {
      userId: {
        type: Number
      },
      comment: {
        type: String
      },
      date: {
        type: Date
      },
      imageUrl: {
        type: [String]
      },
      videUrl: {
        type: [String]
      },
    });
  
    return Comment;
  };*/