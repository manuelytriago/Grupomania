const User =  require('../models/user');
const bcrypt =  require('bcrypt');
const jwtoken =  require('jsonwebtoken');
const script =  require('../js/script');

exports.getuser = (req, res, next) => {
    User.findOne({
    email: req.params.id
    }).then(
        (user) => {
            res.status(200).json(user);
        }
    ).catch(
        (error) => {
            res.status(400).json(
                {
                  message: error
                });
        }
    );
};
exports.deleteuser = (req, res, next) => {
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
exports.signup = (req, res, next) => {
    const value = script.checkPassword(req.body.password);
    if(value.conditional == true){
        bcrypt.hash(req.body.password,10).then(
            (hash) => {
                const user = new User({
                    email: req.body.email,
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    phonenumber: req.body.phonenumber,
                    password: hash,
                });
                user.save().then(
                    () => {
                        res.status(201).json({
                            message: 'User added successfully'
                        })
                    }
                ).catch(
                    (error) => {
                        res.status(500).json({
                            message: new Error("Email is registered")
                        })
                    }
                )
            }
        )
    }else{
        res.status(500).json({
            message: value.message
        })
    }
    
    }
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email}).then(
        (user)=> {
        if(!user){
            return res.status(401).json({
                message: 'User not found'
            });
        }
        bcrypt.compare(req.body.password, user.password).then(
            (valid) => {
                if(!valid){
                    return res.status(401).json({
                        message: 'Incorrect Password'
                    });
                }
                const token = jwtoken.sign(
                    {userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24H'});
                    res.status(201).json({
                    userId: user._id,
                    token: token
                });
            }
        ).catch(
            (error) => {
                res.status(500).json({
                    message: "error"
                });
            }
        );
        }

    ).catch(
        (error) => {
            res.status(500).json({
                error: "error"
            });
        }
    );
};
