//MONGODB CONNECTION:mongodb+srv://project6:<password>@cluster0.c189u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
var  XMLHttpRequest = require('xhr2');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const path =  require('path');
var mongoMask = require('mongo-mask')
const sql = require("mssql")
const mysql = require("mysql")
const sequelize = require('./config/db.config2')
const commentRoutes = require('./routes/comment');
const replyRoutes = require('./routes/reply');
const userRoutes = require('./routes/user');
const { Console } = require('console');
const app = express();
// Import sequelize object,
// Database connection pool managed by Sequelize.
// Create all the table defined using  
// sequelize in Database 
    
// Sync all models that are not 
// already in the database 
    
// Force sync all models 
// It will drop the table first  
// and re-create it afterwards 
/*
try {
  sequelize.sync({force:false})
} catch (error) {
    console.log(error)
}*/

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
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