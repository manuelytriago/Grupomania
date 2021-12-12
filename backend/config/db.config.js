var sql = require('mssql');

const config = {
  user: 'sa',
  password: 'manny912412',
  server: 'localhost',
  database: 'Grupomania',
  options:{
    trustServerCertificate: true,
    trustedconnection : true,
    enableArithAbort: true,
  },
  port : 1433
}
module.exports = config;
/*module.exports = {
  HOST: "localhost",
  PORT: "1433",
  USER: "sa",
  PASSWORD: "manny912412",
  DB: "Grupomannia",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};*/