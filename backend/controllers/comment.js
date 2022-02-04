
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
    }
   );
   var comments2 = JSON.parse(JSON.stringify(comments));
   var replys2 = JSON.parse(JSON.stringify(replys))
   var user_tag2 = JSON.parse(JSON.stringify(usertags[0].tag_posts))
  
    for ( var i = 0 ; i < comments2.length ; i++){
      
      for ( var j = 0 ; j < replys2.length ; j++){
        if (comments2[i].idComment == replys2[j].idComment ){

          if (comments2[i].replies == undefined){

          comments2[i].replies = [];
          comments2[i].replies.push(replys2[j]);
          }else{
            comments2[i].replies.push(replys2[j])
          }
         
          
        }  
      }

      console.log(user_tag2)
      var tags = user_tag2;
      var tags = JSON.parse(JSON.stringify(user_tag2))
      var post_condition = true;
      console.log(tags)
      if (tags != null){
        
      tags = tags.split(",");
        for ( var k = 0 ; k < tags.length ; k++){
          //console.log("TAG position "+k)
            //console.log(tags[k])
          if (comments2[i].idComment == tags[k]){
            //console.log("TAG position "+k)
            //console.log(tags[k])
          comments2[i].user_tag = true;
          k = tags.length;
          }else{
          comments2[i].user_tag = false;
          }


        }
      }else{
        
  
      }
      
    }
  
 //console.log(comments2)
const data = {comments:comments2,reply:JSON.parse(JSON.stringify(replys)),user:JSON.parse(JSON.stringify(usertags))}
        if(!comments2){
            return res.status(401).json({
                message : 'Comment not found'
            });
        }else{

          res.send(data)
        }
    //const replies = await Comment.findAll({ where: { idUserComment: req.params.id } });
       

  /*const request = new sql.Request();
  request.input('idUser', sql.Int, req.params.id)
   // Get All Comment   
    const allcomments = await request.query('(SELECT c.idComment,c.iduser,c.comment,c.image,c.video,c.date,u.email,u.lastname,u.firstname,r.total_replies FROM [comment] c RIGHT JOIN [user] u on c.idUser = u.idUser LEFT JOIN (SELECT COUNT(r.idReply) AS total_replies,idComment FROM [reply] r GROUP BY r.idComment) r on r.idComment = c.idComment) ORDER BY c.date DESC');
   const allreplys = await request.query('SELECT r.idReply,r.idComment,r.idUser,r.reply,r.date,u.email,u.lastname,u.firstname FROM [reply] r INNER JOIN [user] u on r.idUser = u.idUser');
   const user_tag = await request.query('SELECT tag_posts FROM [user] WHERE idUser = @idUser');
   const comments = allcomments;
    const replys = allreplys;
    var comments2 = comments.recordset;
    var replys2 = replys.recordset;
    var user_tag2 = user_tag.recordset;

    for ( var i = 0 ; i < comments2.length ; i++){
      
      for ( var j = 0 ; j < replys2.length ; j++){
        if (comments2[i].idComment == replys2[j].idComment ){

          if (comments2[i].replies == undefined){

          comments2[i].replies = [];
          comments2[i].replies.push(replys2[j]);
          }else{
            comments2[i].replies.push(replys2[j])
          }
         
          
        }  
      }
      var tags = JSON.parse(JSON.stringify(user_tag.recordsets[0][0].tag_posts));
   
      if (tags != null){
        
        for ( var k = 0 ; k < tags.length ; k++){
          //console.log("TAG position "+k)
           // console.log(tags[k])
          if (comments2[i].idComment == tags[k]){
           // console.log("TAG position "+k)
            //console.log(tags[k])
          comments2[i].user_tag = true;
          k = tags.length;
          }else{
          comments2[i].user_tag = false;
          }


        }
      }else{
        
  
      }
      
    }
    const data = {comments:comments.recordset,reply:replys.recordset,user:user_tag.recordset}
    if (comments.rowsAffected >= 1) {
          res.send(data)
    } else {
    res.status(500).json({
        message: "No posts"
    });
  }*/

  } catch (error) {
    next(error);
  }
}

/* FUNCTION TO CREATE A COMMENT DONE*/
exports.createComment = async(req, res, next) => {
  const url = req.protocol+'://'+req.get('host')
  req.body = JSON.parse(req.body.body)
  //console.log(req.body)
      // Create a Comment
      if (req.file) {
      const url = req.protocol+'://'+req.get('host');
      arrayImages += req.body.imageUrl;
      //req.body = JSON.parse(req.body.body);
      //console.log(req.file);
      //var actual_date = new Date().toLocaleTimeString()
      var date = new Date();
      var actual_date = new Date(date.getTime() - date.getTimezoneOffset()*60000).toISOString();
    
      /*var fecha = (actual_date.getMonth()+1) + '-' + ( actual_date.getDate() ) + '-' + actual_date.getFullYear() + " "+ (actual_date.getHours()-5) + ':' + actual_date.getMinutes();
*/ 
      /*const comment = new Comment({
        idUserComment:req.body.userId,
        comment: req.body.comment,
        image: "",
        video: "",
        date: actual_date
      });*/
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
    
      /*comment.save().then(
        (data) => {
          console.log("data post saved")
          console.log(data)
          res.status(201).json({
            message: 'comment posted successfully'
          })
        }
      ).catch(
          (error) => {
            res.status(500).json({
              message: "Comment was not created"
          });
          }
      )*/
      }else {
        /*.log(req.body)
        console.log(req.body.userId)
        console.log(req.body.comment)
*/
       

        var date = new Date();
        var actual_date = new Date(date.getTime() - date.getTimezoneOffset()*60000).toISOString();
        //console.log(date)
        /*var fecha = (actual_date.getMonth()+1) + '-' + ( actual_date.getDate() ) + '-' + actual_date.getFullYear() + " "+ (actual_date.getHours()-5) + ':' + actual_date.getMinutes();
  */ 
        const comment = await Comment.create({ 
          idUserComment:req.body.userId,
          comment: req.body.comment,
          date: actual_date});
          res.status(201).json({
            message: comment
          })
        /*const comment = new Comment({
          idUserComment:req.body.userId,
          comment: req.body.comment,
          date: actual_date
        });
        comment.save().then(
          () => {
            res.status(201).json({
              message: 'comment posted successfully'
            })
          }
        ).catch(
            (error) => {
              console.log(error)
              res.status(500).json({
                message: error
            });
            }
        )  */



      /*var actual_date = new Date();
      var fecha = (actual_date.getMonth()+1) + '-' + ( actual_date.getDate() ) + '-' + actual_date.getFullYear();
      const request = new sql.Request();
      request.input('idUser', sql.NVarChar, req.body.userId)
      request.input('comment', sql.NVarChar, req.body.comment)
      //request.input('image', sql.NVarChar,   '/../../assets/'+req.file.filename)
      //request.input('video', sql.NVarChar,  '/../../assets/'+req.file.filename)
      request.input('date', sql.Date , fecha)

      // Save Comment in the database
      const dataset = await request.query(
          'INSERT INTO [comment] (idUser,comment,date) VALUES (@idUser,@comment,@date)');
          const user = dataset;
         // console.log("dataset")
         // console.log(dataset)
      if (user.rowsAffected == 1) {
        res.status(201).json({
          message: 'comment posted successfully'
        })
      } else {

         // console.log("dataset")
         // console.log(dataset)
          res.status(500).json({
              message: "User was not created"
          });
      }*/

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
        if (comments2[i].idComment == replys2[j].idComment ){
          if (comments2[i].replies == undefined){
          comments2[i].replies = [];
          comments2[i].replies.push(replys2[j]);
          }else{
            comments2[i].replies.push(replys2[j])
          }
         
          
        }  
      }
      const data = {comments:JSON.parse(JSON.stringify(getcomment)),reply:JSON.parse(JSON.stringify(getallreplys))}
      res.send(data)
    }
  } catch (error) {
    res.status(400).json({message: "Not user found"});
  }
}

/* FUNCTION TO CREATE A COMMENT DONE 
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