//const sql = require("mssql/msnodesqlv8");
const sql = require("mssql");

const pool = new sql.ConnectionPool({    
    //server: "DESKTOP-0G2IHRM\\SQLEXPRESS",
    user: "mykaito",
    password: "Admin12345",
    server: "myoka1mb.database.windows.net",
    database: "QLHeThongMayBayNodejs",
});
pool.connect(function(err){
    if(err) throw err;
    console.log("Connected Success !")
  })
  
module.exports = pool;
