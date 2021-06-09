var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin12345",
  database: "quanlydatvemaybay"
});

con.connect(function(err){
  if(err) throw err;
  console.log("Connected Success !")
})

module.exports = con;