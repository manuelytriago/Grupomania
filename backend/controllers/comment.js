
const Comment =  require('../models/comment');
const Reply =  require('../models/reply');
const User =  require('../models/user');
const { QueryTypes } = require('sequelize');
const fs = require('fs');
const script =  require('../js/script');
const sql = require('mssql');
var config = require('../config/db.config');
const { Console } = require('console');
const { json } = require('body-parser');
const sequelize = require('../config/db.config2');
let arrayImages = [];
let arrayVideos = [];

/* FUNCTION TO GET ALL COMMENTS DONE*/
exports.getAllComment = async(req, res, next) => {
  try {
    const comments = await sequelize.query('(SELECT c.idComment,c.idUserComment,c.comment,c.image,c.video,c.myDate,u.email,u.lastname,u.firstname,r.total_replies FROM [Comments] c LEFT JOIN [Users] u on c.idUserComment = u.idUser LEFT JOIN (SELECT COUNT(r.idReply) AS total_replies,idCommentReply FROM [Replies] r GROUP BY r.idCommentReply) r on r.idCommentReply = c.idComment) ORDER BY c.myDate DESC',
    {
      type: QueryTypes.SELECT
    }); 
    const usertags = await sequelize.query("SELECT u.tag_posts FROM [Users] u WHERE u.idUser = $idUser",
    {
     bind: { idUser: req.params.id },
     type: QueryTypes.SELECT
    });
   
    const replys = await sequelize.query('SELECT r.idReply,r.idCommentReply,r.idUser,r.reply,r.myDate,u.email,u.lastname,u.firstname FROM [replies] r INNER JOIN [Users] u on r.idUser = u.idUser',
    {
      type: QueryTypes.SELECT
    });
   var comments2 = JSON.parse(JSON.stringify(comments));
   var replys2 = JSON.parse(JSON.stringify(replys))
   var user_tag2 = JSON.parse(JSON.stringify(usertags[0].tag_posts))
  console.log(replys2)
    for ( var i = 0 ; i < comments2.length ; i++){
      for ( var j = 0 ; j < replys2.length ; j++){
        console.log(replys2[j].idCommentReply)
        if (comments2[i].idComment == replys2[j].idCommentReply ){
          if (comments2[i].replies == undefined){
          comments2[i].replies = [];
          comments2[i].replies.push(replys2[j]);
          }else{
            comments2[i].replies.push(replys2[j])
          }
        }  
      }
      var tags = JSON.parse(JSON.stringify(user_tag2))
      var post_condition = true;
      if (tags != null){
      tags = tags.split(",");
        for ( var k = 0 ; k < tags.length ; k++){
          if (comments2[i].idComment == tags[k]){
          comments2[i].user_tag = true;
          k = tags.length;
          }else{
          comments2[i].user_tag = false;
          }
        }
      }
      
    }
  console.log(comments2)
const data = {comments:comments2,reply:JSON.parse(JSON.stringify(replys2)),user:JSON.parse(JSON.stringify(user_tag2))}
        if(!comments2){
            return res.status(401).json({
                message : 'Comments not found'
            });
        }else{
          res.send(data)
        }
  } catch (error) {
    next(error);
  }
}

/* FUNCTION TO CREATE A COMMENT DONE*/
exports.createComment = async(req, res, next) => {
  const url = req.protocol+'://'+req.get('host')
  req.body = JSON.parse(req.body.body)
      if (req.file) {
      const url = req.protocol+'://'+req.get('host');
      arrayImages += req.body.imageUrl;
      var date = new Date();
      var actual_date = new Date(date.getTime() - date.getTimezoneOffset()*60000).toISOString();
      if (req.file.mimetype == 'video/mp4'){
        const comment = await Comment.create({ 
          idUserComment:req.body.userId,
          comment: req.body.comment,
          video: req.file.filename,
          date: actual_date});
          console.log("comment")
          console.log(comment)
          res.status(201).json({
            message: comment
          })
        
      }else{
        const comment = await Comment.create({ 
          idUserComment:req.body.userId,
          comment: req.body.comment,
          image: req.file.filename,
          date: actual_date});
          res.status(201).json({
            message: comment
          })
      }
      }else {
        var date = new Date();
        var actual_date = new Date(date.getTime() - date.getTimezoneOffset()*60000).toISOString();
        const comment = await Comment.create({ 
          idUserComment:req.body.userId,
          comment: req.body.comment,
          date: actual_date});
          res.status(201).json({
            message: comment
          })
      }
}

/* FUNCTION TO GET A COMMENT*/
exports.getOneComment =  async (req, res, next) => {
  try {
    const getcomment = await sequelize.query('(SELECT c.idComment,c.idUserComment,c.comment,c.image,c.video,c.myDate,u.email,u.lastname,u.firstname,r.total_replies FROM [Comments] c LEFT JOIN [Users] u on c.idUserComment = u.idUser LEFT JOIN (SELECT COUNT(r.idReply) AS total_replies,idCommentReply FROM [replies] r GROUP BY r.idCommentReply) r on r.idCommentReply = c.idComment WHERE c.idComment = $idComment ) ORDER BY c.myDate DESC ',
   {
     bind: { idComment: req.params.idComment },
     type: QueryTypes.SELECT
   });
   const getallreplys = await sequelize.query('SELECT r.idReply,r.idCommentReply,r.idUser,r.reply,r.myDate,u.email,u.lastname,u.firstname FROM [replies] r INNER JOIN [Users] u on r.idUser = u.idUser WHERE r.idCommentReply = $idComment',
   {
     bind: { idComment: req.params.idComment },
     type: QueryTypes.SELECT
   });
   const comments = JSON.parse(JSON.stringify(getcomment))
   const replys = JSON.parse(JSON.stringify(getallreplys))
   var comments2 = JSON.parse(JSON.stringify(getcomment))
   var replys2 = JSON.parse(JSON.stringify(getallreplys))
    for ( var i = 0 ; i < comments2.length ; i++){
      for ( var j = 0 ; j < replys2.length ; j++){
    
        if (comments2[i].idComment == replys2[j].idCommentReply ){
          if (comments2[i].replies == undefined){
          comments2[i].replies = [];
          comments2[i].replies.push(replys2[j]);
          }else{
            comments2[i].replies.push(replys2[j])
          }
         
          
        }  
      }
      console.log(comments2)
      const data = {comments:comments2,reply:JSON.parse(JSON.stringify(replys2))}
      res.send(data)
    }
  } catch (error) {
    res.status(400).json({message: "Not user found"});
  }
}

/* FUNCTION TO MODIFY A COMMENT DONE 
exports.modifyComment = (req, res, next) => {
        let comment = new Comment({ _id: req.params._id });
        if (req.file) {
          const url = req.protocol + '://' + req.get('host');
          req.body.comment = JSON.parse(req.body.comment);
          comment = {
            _id: req.params.id,
            name: req.body.comment.name,
            manufacturer: req.body.comment.manufacturer,
            description: req.body.comment.description,
            imageUrl: '/../../assets/'+req.file.filename,
            mainPepper: req.body.comment.mainPepper,
            heat: req.body.comment.heat,
            userId: req.body.comment.userId,
          };
        } else {
          comment = {
            _id: req.params.id,
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            description: req.body.description,
            //imageUrl: req.body.imageUrl,
            mainPepper: req.body.mainPepper,
            heat: req.body.heat,
            userId: req.body.userId
          };
        }
        Comment.updateOne({_id: req.params.id}, comment).then(
          () => {
            res.status(201).json({
              message: 'Sauce updated successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              message: error
            });
          }
        );
} 








// Not for this project
exports.deleteComment = (req, res, next) => {
  Comment.findOne({_id: req.params.id}).then(
          (comment) => {
            const filename = comment.imageUrl.split('/../../assets/')[1];
            fs.unlink('../assets/'+filename, () => {
              Comment.deleteOne({_id: req.params.id}).then(
                () => {
                  res.status(200).json({
                    message: 'Sauce Deleted!'
                  });
                }
              ).catch(
                (error) => {
                  res.status(400).json({
                    message: error
                  });
                }
              );
            });
          }
        );
    };
// Not for this project
exports.likeComment = (req, res, next) => {
  var userslikes = new Comment({ _id: req.params.id});
  let comment = new Comment({ _id: req.params.id });
  // Checking if it is like, cancelling or dislikes
    // Like
      if (req.body.like == 1){
        Comment.findOne({
          _id: req.params.id
        }).then(
          (comments) => {
            arraylikes = comments.usersLiked; 
            if (script.exitsUser(arraylikes,req.body.userId) == true ){
            }else{
            arraylikes = script.modifyArray(arraylikes,req.body.userId,'Add')
            comment = {
              _id: req.params.id,
              likes: comments.likes+1,
              usersLiked: arraylikes 
            }; 
            }
            Comment.updateOne({_id: req.params.id}, comment).then(
            () => {
              res.status(201).json({
                message: 'Sauce liked successfully!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                message: 'Error'+error
              });
            }
          );
        
        }).catch(
          (error) => {
              res.status(400).json(
                  {
                    message: error
                  });
          }
      );
    }
    // Canceling Like or dislike
      if (req.body.like == 0){
        Comment.findOne({
          _id: req.params.id
        }).then(
          (comments) => {
            arraylikes = comments.usersLiked;
            arrayDisliked = comments.usersDisliked;
            if (script.exitsUser(arraylikes,req.body.userId) == true ){
              arraylikes = comments.usersLiked;
              arraylikes = script.modifyArray(arraylikes,req.body.userId,'Delete');
              comment = {
                _id: req.params.id,
                likes: comments.likes-1,
                usersLiked: arraylikes
              };

            }else{
              //console.log("Doesn't exist");
            }
            if (script.exitsUser(arrayDisliked,req.body.userId) == true ){
            arrayDisliked = comments.usersDisliked;
            arrayDisliked = script.modifyArray(arrayDisliked,req.body.userId,'Delete');
            comment = {
                _id: req.params.id,
                dislikes: comments.dislikes-1,
                usersDisliked: arrayDisliked
              };
            }else{
              //console.log("Doesn't  exist");
            }
            Comment.updateOne({_id: req.params.id}, comment).then(
                () => {
                  res.status(201).json({
                    message: 'Sauce  disliked successfully!'
                  });
                }
              ).catch(
                (error) => {
                  res.status(400).json({
                    message: 'Error'+error
                  });
                }
              );
          }).catch(
          (error) => {
              res.status(400).json(
                  {
                    message: error
                  });
          }
      );
      }
      // Dislike
      if (req.body.like == -1){
        Comment.findOne({
          _id: req.params.id
        }).then(
          (comments) => {
        arrayDisliked = comment.usersDisliked;
        arrayDisliked = script.modifyArray(arrayDisliked,req.body.userId,'Add')
        comment = {
          _id: req.params.id,
          dislikes: comments.dislikes+1,
          usersDisliked: arrayDisliked
          };
          Comment.updateOne({_id: req.params.id}, comment).then(
            () => {
              res.status(201).json({
                message: 'Sauce disliked successfully!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                message: 'Error'+error
              });
            }
          );
          
        }).catch(
          (error) => {
              res.status(400).json(
                  {
                    message: error
                  });
          }
      );

    }
        
    };
  
*/