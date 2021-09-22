
const Comment =  require('../models/comment');
const fs = require('fs');
const script =  require('../js/script');
/*Birthdate DATE  
MASKED WITH (FUNCTION = 'default()') NOT NULL*/
let arraylikes = [];
let arrayDisliked = [];
exports.createComment = (req, res, next) => {
    const url = req.protocol+'://'+req.get('host');
    req.body.comment = JSON.parse(req.body.comment)
    const comment = new Comment({
        name: req.body.comment.name,
        manufacturer: req.body.comment.manufacturer,
        description: req.body.comment.description,
        imageUrl: '/../../assets/'+req.file.filename,
        mainPepper: req.body.comment.mainPepper,
        heat: req.body.comment.heat,
        userId: req.body.comment.userId,
        likes: 0,
        dislikes: 0,
        usersLiked:arraylikes,
        usersDisliked:arrayDisliked
    });
    comment.save().then(
        () => {
            res.status(201).json({
                message: 'Sauce saved successfully'
            })
        }
        ).catch((error) => {
        res.status(400).json({
          message: error
        });
        }
        );
    }
exports.getOneComment = (req, res, next) => {
  Comment.findOne({
            _id: req.params.id
        }).then(
            (comments) => {
                res.status(200).json(comments);
            }
        ).catch(
            (error) => {
                res.status(400).json(
                    {
                      message: error
                    });
            }
        );
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
exports.getAllComment = (req, res, next) => {
  Comment.find().then(
        (comments) => {
            res.status(200).json(comments);
        }
    ).catch(
        (error) => {
            res.status(400).json(
                {
                  message: error
                });
        }
    );
    }
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
  
