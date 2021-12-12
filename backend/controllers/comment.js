
const Comment =  require('../models/comment');
const fs = require('fs');
const script =  require('../js/script');
const sql = require('mssql');
var config = require('../config/db.config');
const { Console } = require('console');
const { json } = require('body-parser');
/*Birthdate DATE  
MASKED WITH (FUNCTION = 'default()') NOT NULL*/
let arrayImages = [];
let arrayVideos = [];

exports.getAllComment = async(req, res, next) => {
  try {
  const request = new sql.Request();
  request.input('idUser', sql.Int, req.params.id)
   // Get All Comment   
    const allcomments = await request.query('(SELECT c.idComment,c.iduser,c.comment,c.image,c.video,c.date,u.email,u.lastname,u.firstname,r.total_replies FROM [comment] c RIGHT JOIN [user] u on c.idUser = u.idUser LEFT JOIN (SELECT COUNT(r.idReply) AS total_replies,idComment FROM [reply] r GROUP BY r.idComment) r on r.idComment = c.idComment) ORDER BY c.date DESC');
   const allreplys = await request.query('SELECT r.idReply,r.idComment,r.idUser,r.reply,r.date,u.email,u.lastname,u.firstname FROM [reply] r INNER JOIN [user] u on r.idUser = u.idUser');
   const user_tag = await request.query('SELECT tag_posts FROM [user] WHERE idUser = @idUser');
   
   //const dataset = await request.query('SELECT c.idComment, c.iduser, c.comment, c.image, c.video, c.date, u.email, u.lastname, u.firstname, r.reply, r.image, r.date FROM [comment] c INNER JOIN [user] u on c.idUser = u.email RIGHT JOIN [reply] r on c.idComment = r.idComment');
  
   /*SELECT * FROM eventos e
    INNER JOIN clientes  c ON e.EV_Id_Cliente  = c.CL_Id_Cliente
    INNER JOIN vehiculos v ON e.EV_Id_Vehiculo = v.VH_Id_Vehiculo
WHERE e.id = 55;*/
     

      

    const comments = allcomments;
    const replys = allreplys;
    var comments2 = comments.recordset;
    var replys2 = replys.recordset;
    var user_tag2 = user_tag.recordset;
    
    //console.log("replys2")
    //console.log(replys2)
    //console.log("user_tag")
    //console.log(user_tag)
    //console.log("comments")
    //console.log(comments)
    //console.log("Allreplys")
   //console.log(replys)
    for ( var i = 0 ; i < comments2.length ; i++){
      
      console.log("CHECKING COMMENTS")
      for ( var j = 0 ; j < replys2.length ; j++){
        if (comments2[i].idComment == replys2[j].idComment ){
          console.log("comment found")
          if (comments2[i].replies == undefined){
            console.log("UNDEFINED")
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
          console.log("TAG position "+k)
            console.log(tags[k])
          if (comments2[i].idComment == tags[k]){
            console.log("TAG position "+k)
            console.log(tags[k])
          comments2[i].user_tag = true;
          k = tags.length;
          }else{
          comments2[i].user_tag = false;
          }


        }
      }else{
        
  
      }
      
    }
    console.log(comments2)
    console.log(comments2)
    //console.log("qtyByReplys")
   // console.log(qtyByReplys)
    const data = {comments:comments.recordset,reply:replys.recordset,user:user_tag.recordset}
    if (comments.rowsAffected >= 1) {
          res.send(data)
    } else {
    res.status(500).json({
        message: "No posts"
    });
  }

  } catch (error) {
    next(error);
  }
}

exports.createComment = async(req, res, next) => {
  const url = req.protocol+'://'+req.get('host')
  req.body = JSON.parse(req.body.body)
  console.log(req)
      // Create a Comment
      if (req.file) {
        const url = req.protocol+'://'+req.get('host');
      arrayImages += req.body.imageUrl;
      //req.body = JSON.parse(req.body.body);
      console.log(req.file);
      //var actual_date = new Date().toLocaleTimeString()
      var date = new Date();
      var actual_date = new Date(date.getTime() - date.getTimezoneOffset()*60000).toISOString();
      
      
      /*var fecha = (actual_date.getMonth()+1) + '-' + ( actual_date.getDate() ) + '-' + actual_date.getFullYear() + " "+ (actual_date.getHours()-5) + ':' + actual_date.getMinutes();
*/
      const request = new sql.Request();
      request.input('idUser', sql.Int, req.body.userId)
      request.input('comment', sql.NVarChar, req.body.comment)
      request.input('date', sql.DateTime, actual_date)
      if (req.file.mimetype == 'video/mp4'){
      request.input('image', sql.NVarChar, "")
      request.input('video', sql.NVarChar, req.file.filename)
      }else{
      request.input('image', sql.NVarChar, req.file.filename)
      request.input('video', sql.NVarChar, "")
      }
      // Save Comment in the database
      const dataset = await request.query(
          'INSERT INTO [comment] (idUser,comment,image,video,date) VALUES (@idUser,@comment,@image,@video,@date)');
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
      }else {

      var actual_date = new Date();
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
      
    }

exports.getOneComment =  async (req, res, next) => {
  try {
    const request = new sql.Request();
    request.input('idUser', sql.Int, req.params.id)
    request.input('idComment', sql.Int, req.params.idComment)
     // Get one Comment
     //const allcomments = await request.query('(SELECT c.idComment,c.iduser,c.comment,c.image,c.video,c.date,u.email,u.lastname,u.firstname,r.total_replies FROM [comment] c RIGHT JOIN [user] u on c.idUser = u.idUser LEFT JOIN (SELECT COUNT(r.idReply) AS total_replies,idComment FROM [reply] r GROUP BY r.idComment) r on r.idComment = c.idComment) ORDER BY c.date DESC');
     //const allreplys = await request.query('SELECT r.idReply,r.idComment,r.idUser,r.reply,r.date,u.email,u.lastname,u.firstname FROM [reply] r INNER JOIN [user] u on r.idUser = u.idUser');
    
     const getcomment = await request.query('(SELECT c.idComment,c.iduser,c.comment,c.image,c.video,c.date,u.email,u.lastname,u.firstname,r.total_replies FROM [comment] c RIGHT JOIN [user] u on c.idUser = u.idUser LEFT JOIN (SELECT COUNT(r.idReply) AS total_replies,idComment FROM [reply] r GROUP BY r.idComment) r on r.idComment = c.idComment WHERE c.idComment = @idComment ) ORDER BY c.date DESC ');
     const getallreplys = await request.query('SELECT r.idReply,r.idComment,r.idUser,r.reply,r.date,u.email,u.lastname,u.firstname FROM [reply] r INNER JOIN [user] u on r.idUser = u.idUser WHERE r.idComment=@idComment');
     //const qtyByReplys = await request.query('SELECT COUNT(r.idReply) AS replies FROM [reply] r GROUP BY r.idComment');
     //const user_tag = await request.query('SELECT tag_posts FROM [user] WHERE idUser = @idUser');
     
     //const dataset = await request.query('SELECT c.idComment, c.iduser, c.comment, c.image, c.video, c.date, u.email, u.lastname, u.firstname, r.reply, r.image, r.date FROM [comment] c INNER JOIN [user] u on c.idUser = u.email RIGHT JOIN [reply] r on c.idComment = r.idComment');
    
     /*SELECT * FROM eventos e
      INNER JOIN clientes  c ON e.EV_Id_Cliente  = c.CL_Id_Cliente
      INNER JOIN vehiculos v ON e.EV_Id_Vehiculo = v.VH_Id_Vehiculo
  WHERE e.id = 55;*/
       
  
        
  
      const comments = getcomment;
      const replys = getallreplys;
      var comments2 = getcomment.recordset;
      var replys2 = getallreplys.recordset;
  
      //var user_tag2 = user_tag.recordset;
      
  
      console.log("replys2")
      console.log(replys2)
      //console.log("user_tag")
      //console.log(user_tag)
      console.log("comments2")
      console.log(comments2)
      //console.log("Allreplys")
     //console.log(replys)
      for ( var i = 0 ; i < comments2.length ; i++){
        
        console.log("CHECKING COMMENTS")
        for ( var j = 0 ; j < replys2.length ; j++){
          if (comments2[i].idComment == replys2[j].idComment ){
            console.log("comment found")
            if (comments2[i].replies == undefined){
              console.log("UNDEFINED")
            comments2[i].replies = [];
            comments2[i].replies.push(replys2[j]);
            }else{
              comments2[i].replies.push(replys2[j])
            }
           
            
          }  
        }
      }
      console.log(comments2)
      console.log(comments2)
      //console.log("qtyByReplys")
     // console.log(qtyByReplys)
      const data = {comments:comments.recordset,reply:replys.recordset}
      if (comments.rowsAffected >= 1) {
            res.send(data)
      } else {
      res.status(500).json({
          message: "No posts"
      });
    }
  
    } catch (error) {
      next(error);
    }
    }
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
    }; 
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
              console.log("Doesn't exist");
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
              console.log("Doesn't  exist");
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
  
