const fs = require('fs');
const bcrypt =  require('bcrypt');
const jwtoken =  require('jsonwebtoken');
const script =  require('../js/script');
var config = require('../config/db.config');
const sql = require('mssql');
const { parse } = require('path');
const { json } = require('body-parser');
const { Console } = require('console');
exports.getuser = async (req, res, next) => {
    try {
        const request = new sql.Request();
        request.input('UserID',req.params.id);
        const dataset = await request.query('SELECT * FROM [user] WHERE email = @UserID');
        var user = dataset;
        if (user.rowsAffected == 1){
            user = JSON.stringify(user.recordset[0])
            user = JSON.parse(user);
            res.send(user)
        }else{
            res.status(500).json({
                message: "Not user found"
            });
        }
      } catch (error) {
        next(error);
      }
};

exports.deleteuser = async (req, res, next) => {

    try {
        const request = new sql.Request();
        request.input('UserID',req.params.id);
        const dataset = await request.query('DELETE FROM [user] WHERE email = @UserID');
        var user = dataset;
        if (user.rowsAffected == 1){
            res.send(user)
        }else{
            res.status(500).json({
                message: "You can't delete your account"
            });
        }
      } catch (error) {
        next(error);
      }

    User.findOne({email: req.params.id}).then(
            (user) => {
                User.deleteOne({email: req.params.id}).then(
                  () => {
                    res.status(200).json({
                      message: 'User Deleted!'
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
          );
};

exports.signup = async (req, res, next) => {  

        const value = script.checkPassword(req.body.password);
        if(value.conditional == true){
            bcrypt.hash(req.body.password,10).then(
                async (hash) => {
                    try {
                    // Create a User
                    const request = new sql.Request();
                    request.input('email', sql.NVarChar, req.body.email)
                    request.input('lastname', sql.NVarChar, req.body.lastname)
                    request.input('firstname', sql.NVarChar, req.body.firstname)
                    request.input('phonenumber', sql.NVarChar, req.body.phonenumber)
                    request.input('pass', sql.NVarChar , hash)

                    // Save User in the database
                    const dataset = await request.query(
                        'INSERT INTO [user] (email,lastname,firstname,phonenumber,password) OUTPUT Inserted.idUser VALUES (@email,@lastname,@firstname,@phonenumber,@pass)');
                        const user = dataset;
                        
                    if (user.rowsAffected == 1) {
                        const usersid = user.recordsets[0][0]
                        const token = jwtoken.sign(
                            {userId: req.body.email},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24H'});
                            res.status(201).json({
                            userId: req.body.email,
                            token: token,
                            id: usersid.idUser
                        });
                    } else {

                        console.log("dataset")
                        console.log(dataset)
                        res.status(500).json({
                            message: "User was not created"
                        });
                    }
                    }catch (error) {
                        if (error.number == 2627){
                            res.status(500).json({
                                message: "Something went wrong"
                            });
                        }
                        
                      }
                })
            }else{
                res.status(500).json({
                    message: value.message
                })
            }
        
}

exports.add = async (req, res, next) => {  

let arrayTags = [];
                   // try {
                    // Get the User
                    const request = new sql.Request();
                    request.input('UserID', req.body.userId);
                    const dataset = await request.query('SELECT tag_posts,idUser FROM [user] WHERE idUser = @UserID');
                    const user = dataset;
                    var conditional = user.recordsets[0][0].tag_posts;
                    console.log("conditional")
                    console.log(conditional)
                    console.log("req.body.postiD")
                    console.log(req.body.postiD)
                    try {
                        if (conditional == null){
                            console.log("conditional is null")
                            arrayTags.push(JSON.stringify(req.body.postiD))
                            console.log(arrayTags);
                            console.log("arrayTagsnull");
                            var newarray = JSON.parse(arrayTags)
                            const request = new sql.Request();
                            request.input('UserID', sql.Int, req.body.userId)
                            request.input('tags', sql.NVarChar, newarray)
                            const dataset = await request.query(
                                'UPDATE [user] SET tag_posts=@tags WHERE idUser = @UserID');
                                const user2 = dataset;
                                console.log("user")
                                console.log(user2)
                                if (user2.rowsAffected == 1) {
                                    res.status(201).json({
                                      message: 'comment viewed successfully'
                                    })
                                  } else {
                            
                                      console.log("dataset")
                                      console.log(dataset)
                                      res.status(500).json({
                                          message: "comment is already viewed"
                                      });
                                  }
                                            
                        }else{
                            console.log("conditional is not null")
                            var tags = JSON.parse(JSON.stringify(user.recordsets[0][0].tag_posts));

                            console.log("tags")
                            console.log(tags)
                            var post_condition = true;
                            for (var i = 0; i < tags.length; i++){

                                console.log("conditional is in")
                                if(tags[i] == req.body.postiD){
                                    console.log("conditional is been set to false")
                                    post_condition = false;
                                }
                            }

                            console.log(post_condition)
                            if(post_condition == true){
                            var tags = JSON.parse(JSON.stringify(user.recordsets[0][0].tag_posts));

                            console.log("db Array "); 
                           // arrayTags.push = req.body.postiD;
                            arrayTags.push(tags);
                            console.log("GETTING TAG FROM USER");
                            console.log(arrayTags);
                            var value = JSON.parse(req.body.postiD)
                            arrayTags.push(value) ;
                            console.log("ADDING NEW TAG");
                            console.log(arrayTags);
                            var newarray = JSON.stringify(arrayTags)
                            console.log("varchar");
                            console.log(newarray);
                            newarray = arrayTags.toLocaleString();
                            console.log("string");
                            console.log(newarray);
                            console.log("user");
                            console.log(req.body.userId);
                            const request = new sql.Request();
                            request.input('UserID', sql.Int, req.body.userId)
                            request.input('tags', sql.NVarChar, newarray)
                            const dataset = await request.query('UPDATE [user] SET tag_posts=@tags WHERE idUser = @UserID');
                                const user2 = dataset;
                                console.log("user")
                                console.log(user2)
                                if (user2.rowsAffected == 1) {
                                    res.status(201).json({
                                        message: 'comment viewed successfully'
                                    })
                                  } else {
                            
                                      console.log("dataset")
                                      console.log(dataset)
                                      res.status(500).json({
                                        message: "comment is already viewed"
                                      });
                                  }

                            }else{
                                console.log("Post is already read"); 
                            }
                            
                        }}catch (error) {
                            res.status(error);
                            if (error.number == 2627){
                                res.status(500).json({
                                    message: "Something went wrong"
                                });
                            }
                            
                          }
                 /*}catch (error) {
                        res.status(error);
                        if (error.number == 2627){
                            res.status(500).json({
                                message: "Something went wrong"
                            });
                        }
                        
                      }*/
                
        
}

exports.login = async (req, res, next) => {
 
    try {
        const request = new sql.Request();
        request.input('UserID', req.body.email);
        const dataset = await request.query('SELECT * FROM [user] WHERE email = @UserID');
        var user = dataset;
        if (user.rowsAffected == 1){
            user = JSON.stringify(user.recordset[0])
            user = JSON.parse(user);
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {

                    if(!valid){
                        return res.status(401).json({
                            message: 'Incorrect Password'
                        });
                    }
                    const token = jwtoken.sign(
                        {userId: user.email},
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24H'});
                        res.status(201).json({
                        userId: user.email,
                        token: token,
                        id: user.idUser
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        message: "error"
                    });
                }
            );
        }else{
            res.status(500).json({
                message: "Not user found"
            });
        }
      } catch (error) {
        next(error);
      }
};
