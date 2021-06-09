//const sql = require("mssql/msnodesqlv8");
const sql = require("mssql");

const pool = new sql.ConnectionPool({    
    //server: "DESKTOP-0G2IHRM\\SQLEXPRESS",
    user: "oka1kh",
    password: "Nhattien69999",
    server: "oka1kh.database.windows.net",
    database: "PROFILE_DB",
});
pool.connect(function(err){
    if(err) throw err;
    console.log("Connected Success !")
  })
  
module.exports = pool;
