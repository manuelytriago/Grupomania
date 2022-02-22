const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //req.body = JSON.parse(req.body.body)
    try {
        const token = req.headers.authorization;
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodeToken.userId;
        if(req.params.userId && req.params.userId !== userId){
            throw 'Invalid user ID';
        }
        else{
            next();
        }
     }catch{
        res.status(401).json({
            message : new Error('Invalid request')
        });
        res.status(500).json({
            message : new Error('Invalid request')
        });
    }
};