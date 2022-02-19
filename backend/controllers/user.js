const fs = require('fs');
const bcrypt =  require('bcrypt');
const jwtoken =  require('jsonwebtoken');
const script =  require('../js/script');
const sql = require('mssql');
const { parse } = require('path');
const { json } = require('body-parser');
const { Console } = require('console');
const User =  require('../models/user');
const Comment =  require('../models/comment');
const Reply =  require('../models/reply');
const { QueryTypes } = require('sequelize');

/* FUNCTION TO SIGNUP A USER DONE!!*/
exports.signup = async (req, res, next) => { 
    const value = script.checkPassword(req.body.password);
    let user ;
    if(value.conditional == true){
        try { 
            const hash = await bcrypt.hash(req.body.password,10);
            try {
                user = await User.findOne({ where: { email: req.body.email } });
            } catch (error) {
                return res.status(402).json({message: "Somethin went wrong"});
            }
            if(!user){
                try {
                    user = new User({
                    email: req.body.email,
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    phonenumber: req.body.phonenumber,
                    password: hash,
                    });
                    const user2 = await user.save();
                    const token = jwtoken.sign({userId: user.idUser},'RANDOM_TOKEN_SECRET',{ expiresIn: '24H'});
                                    res.status(201).json({email: user.email,userId: user.idUser,token: token,firstname:user.firstname,lastname:user.lastname});
                    }catch (error) {
       
                        res.status(500).json({message: error});
                    
                    } 

            }else{
                return res.status(402).json({
                message: "Email already register please change the email"
                });
            }
        } catch (error) {
                res.status(500).json({message: "error"});
        }
    }else{
        res.status(500).json({message: value.message})
    }
        
        
}

/* FUNCTION TO LOGIN A USER DONE!!*/
exports.login = async (req, res, next) => {
    let user ;
    try {
        user = await User.findOne({ where: { email: req.body.email } });
    } catch (error) {
        return res.status(402).json({message: "Somethin went wrong"});
    }
    if(user){
        try {
            const check = await bcrypt.compare(req.body.password, user.password);
            if(!check){
                return res.status(401).json({ message: "Password Incorrect"});
            }else{
                const token = jwtoken.sign({userId: user.idUser},'RANDOM_TOKEN_SECRET',{ expiresIn: '24H'});
                res.status(201).json({email: user.email,userId: user.idUser,token: token,firstname:user.firstname,lastname:user.lastname});
            }
        } catch (error) {
            return res.status(401).json({
                message: "Somethin went wrong"
            });
        }

    }else{
        return res.status(402).json({
            message: "User not Found"
        });
    }
           
     
};

/* FUNCTION TO GET A USER DONE!!*/
exports.getuser = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {email: req.params.id}});
        res.send(user.dataValues)
      } catch (error) {
        res.status(400).json({message: "Not user found"});
      }
};

/* FUNCTION TO DELETE A USER DONE!!*/
exports.deleteuser = async (req, res, next) => {
    try {
        const user = await User.destroy({where: {email: req.params.id}})
        if(user == 1){
            res.status(200).json({
                message: 'User Deleted!'
              });
        }else{
            res.status(400).json(
                {
                    message: "Not user found"
                });

        }
        
      } catch (error) {
        next(error);
      }
};

/* FUNCTION TO SAVE ALL COMMENTS READ BY USER */
exports.addpostreaduser = async (req, res, next) => {  
let arrayTags = [];
                    try {
                        const user = await User.findOne({where: {idUser: req.body.userId}});
                        var conditional = user.dataValues.tag_posts;
                        if (conditional === null){ 
                            var num = req.body.postiD
                            num = num.toString();
                            console.log(num)
                            arrayTags.push(num)
                            var newarray = arrayTags.toLocaleString();
                            const user2 = await User.update({ tag_posts: newarray }, {
                                where: {
                                  idUser: req.body.userId
                                }
                              });  
                              if (user2 == 1) {
                                res.status(201).json({
                                  message: 'comment viewed successfully'
                                })
                              } else {
                                  res.status(500).json({
                                      message: "comment is already viewed"
                                  });
                              }
                              
                                            
                        }else{
                            var tags = JSON.parse(JSON.stringify(user.dataValues.tag_posts))
                            var post_condition = true;
                            tags = tags.split(",");
                            for (var i = 0; i < tags.length; i++){    
                                if(parseInt(tags[i]) === req.body.postiD){
                                    post_condition = false;
                                    i = (tags.length)+1;
                                }
                            }
                            if(post_condition === true){
                            var tags = JSON.parse(JSON.stringify(user.dataValues.tag_posts));
                            arrayTags.push(tags);
                            /*(var value = JSON.parse(JSON.stringify(req.body.postiD))
                            arrayTags.push(value) ;
*/
                            var num = req.body.postiD
                            num = num.toString();
                            console.log(num)
                            arrayTags.push(num)
                            var newarray = arrayTags.toLocaleString();
                            const user2 = await User.update({ tag_posts: newarray }, {
                                where: {
                                  idUser: req.body.userId
                                }
                              });  
                              if (user2 == 1) {
                                res.status(201).json({
                                  message: 'comment viewed successfully'
                                })
                              } else {
                                  res.status(500).json({
                                message: "comment is already viewed"
                                  });
                              }
                            }
                            
                        }
                      } catch (error) {
                          res.status("error");
                        if (error.number == 2627){
                            res.status(500).json({
                                message: "Something went wrong"
                            });
                        }
                      }
                   
}

