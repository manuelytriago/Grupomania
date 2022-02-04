//MONGODB CONNECTION:mongodb+srv://project6:<password>@cluster0.c189u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const path =  require('path');
var mongoMask = require('mongo-mask')
const sql = require("mssql")
const mysql = require("mysql")
const config = require ("./config/db.config")
const commentRoutes = require('./routes/comment');
const replyRoutes = require('./routes/reply');
const userRoutes = require('./routes/user');
const app = express();
const Sequelize = require('sequelize')
// Import the user model we have defined 
const User = require('./models/user')
// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('./config/db.config2')
// Create all the table defined using  
// sequelize in Database 
    
// Sync all models that are not 
// already in the database 
    
// Force sync all models 
// It will drop the table first  
// and re-create it afterwards 
sequelize.sync({force:false})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/*mongoose.connect('mongodb+srv://project6:Project6OpenClassroom@cluster0.c189u.mongodb.net/Grupomania?retryWrites=true&w=majority')
.then(() => {
console.log('Successfully connected to MongoDb Atlas');
}).catch((error) => {
console.log('Unable to connect to MongoDb Atlas');
console.log('Update your mongodb');
console.log(error);

});*/


    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        console.log("Sql Connected");
        // create Request object
        /*var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Student', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });*/
    });
/*
const db = mysql.createConnection(config);

console.log("before connectionn");
db.connect((err) => {
    console.log("Inside");
    if(err){
        console.log(err) ;
    }
        console.log("Mysql Connected");
    
})
console.log("After connectionn");*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, headers, params');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//app.use('',express.static(path.join(__dirname, 'assets/images')));
app.use('/api/reply',replyRoutes);
app.use('/api/comment',commentRoutes);
app.use('/api/auth',userRoutes);

module.exports = app;