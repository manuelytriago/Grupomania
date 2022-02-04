// Include Sequelize module
const Sequelize = require('sequelize')
  
// Creating new Object of Sequelize
const sequelize = new Sequelize(
    'Grupomania',
    'sa',
    'manny912412', {
  
        // Explicitly specifying 
        // mysql database
        dialect: 'mssql',
  
        // By default host is 'localhost'           
        host: 'localhost'
    }
);
  
// Exporting the sequelize object. 
// We can use it in another file
// for creating models
module.exports = sequelize