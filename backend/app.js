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
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
//app.use('',express.static(path.join(__dirname, 'assets/images')));
app.use('/api/reply',replyRoutes);
app.use('/api/comment',commentRoutes);
app.use('/api/auth',userRoutes);

module.exports = app;