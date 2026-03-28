// db.js
const sql = require("mssql");

const config  = {
  user: "sa",
  password: "rr",
  server: "172.20.10.4",
  database: "DepartmentStore",
  options: {
    encrypt: false,
    trustServerCertificate: true    
  },
};


module.exports = { sql, config };