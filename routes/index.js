var express = require('express');
var router = express.Router();
var dbconnect = require("../database/sql");
const fetch = require('node-fetch')
var randomId = require('random-id');
const { json, static } = require('express');
var len = 12;
var pattern = 'A0'
var noidi = "From...";
var noiden = "To...";
var ngaybay = "07/21/2000"
var str = ngaybay[3]+ngaybay[4];
var dataloginform = {};
var user1 = { 
   status: "",
   message : "",
   error: null,
   data: {}
};
var user2 = { 
  data: {},
  status: "",
  message : "",
  error: null,
  token: "",
  refreshToken: "" 
};
/* GET home page. */

router.get('/booknow/booking/addons', function(req, res, next) {
  res.render('setbody/booking-addons', { pagetitle: 'Booking' });
});
router.get('/booknow/booking/addons/payment', function(req, res, next) {
  res.render('setbody/booking-payment', { pagetitle: 'Booking' });
});

/* GET DATABASE. */
router.get('/', function(req, res, next) {
  dbconnect.connect().then(() => {
    dbconnect.request().query('SELECT DISTINCT NoiDi FROM CHUYENBAY ORDER BY NoiDi ',(err, result1) => {      
      if(err) throw err;
      dbconnect.request().query('SELECT DISTINCT NoiDen FROM CHUYENBAY ORDER BY NoiDen ',(err, result2) => {      
        if(err) throw err;                
        dbconnect.request().query('SELECT * FROM LOAIVE ',(err, result3) => {      
          if(err) throw err;
          else{ 
            res.render('setbody/home', {result1:result1, result2: result2, result3: result3, user1: user1, user2: user2});                                  
          }                       
        })
      })
    }) 
  })
});


router.get('/setbody/booknow', function(req, res, next) {
  if(noidi=="From..." || noiden=="To..."){
    dbconnect.connect().then(() => {
      dbconnect.query(`SELECT * FROM VEMAYBAY v, CHUYENBAY c, LOAIVE l, MAYBAY m, HANGMAYBAY h WHERE v.idLoaiVe = l.idLoaiVe AND v.idChuyenBay = c.idChuyenBay AND c.idMayBay = m.idMayBay AND m.idHang = h.idHang`,function(err, result){
        if(err) throw err;
        else{
          res.render('setbody/booknow', {result: result, user1:user1, user2: user2});
        }
      }) 
    })
  }  
});

router.post('/setbody/home', function(req, res, next) {
  noidi = req.body.chuyenbaynoidi;
  noiden = req.body.chuyenbaynoiden;
  ngaybay = req.body.chuyenbayngaybay;
  res.redirect("/setbody/booknow");  
});


router.get('/setbody/booking/:idVe', function(req, res, next) {
  dbconnect.connect().then(() => {
    dbconnect.query(`SELECT * FROM VEMAYBAY v, CHUYENBAY c, LOAIVE l, MAYBAY m, HANGMAYBAY h WHERE v.idLoaiVe = l.idLoaiVe AND v.idChuyenBay = c.idChuyenBay AND c.idMayBay = m.idMayBay AND m.idHang = h.idHang AND idVe = '${req.params.idVe}'`,function(err, result){
      dbconnect.query(`SELECT * FROM KHUYENMAI`,function(err, resultkm){
        if(err) throw err;
        else{
          res.render('setbody/booking', {result: result, user1: user1, user2: user2, resultkm: resultkm});
        }
      })
    }) 
  })
});
//Thanh toan
router.get('/setbody/bookingsuccess', function(req, res, next) {
  res.render('setbody/bookingsuccess', {user1: user1, user2: user2});
});

router.post('/booking/payment', function(req, res, next) { 
  var iddatve = randomId(len, pattern);
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  dbconnect.query(`INSERT INTO DATVE_API (idDatVe,idUser2,HoTen2,Email2,Phone2,DiaChi2,Cards,NgayDat,idVe,TienThanhToan)
   VALUES('${iddatve}','${req.body.idUser2}','${req.body.HoTen2}','${req.body.Email2}','${req.body.Phone2}','${req.body.DiaChi2}','${req.body.Cards}','${date}','${req.body.idVe}','${req.body.TienThanhToan}')`,function(err){
    dbconnect.query(`UPDATE VEMAYBAY SET TrangThai = N'Hết vé' WHERE idVe = '${req.body.idVe}'`,function(err){
      if(err) throw err;
      res.redirect("/setbody/bookingsuccess");
    })    
  }) 
});

//Login
router.get('/setbody/login', function(req, res, next) {
  res.render('setbody/login', {user1: user1, user2: user2});
});
router.post('/setbody/login', function(req, res, next) {
  var usseremail = req.body.email;
  var userpass = req.body.pass;
  dataloginform = {
    email : usseremail,
    pass : userpass
  } 
  dataloginpartner = {
    partnerUsername : usseremail,
    partnerPass : userpass
  }
  var promise = apilogin(dataloginform); 
  promise.then(data => user1 = data).then(()=>{
    if(user1.status == "SUCCES"){
      res.redirect("/");       
    } 
    else{     
      var promisepartner = apiloginPartner(dataloginpartner);       
      promisepartner.then(data=> user2 = data).then(()=>{
        if(user2.status == "SUCCES"){
           res.redirect("/home/index");
        }
        else{
           res.redirect("/setbody/login");
        }
      })
    }    
  }) 
        
});
function apigetuser() {
  const url = 'https://oka1kh.azurewebsites.net/api/user/2015';
  fetch(url)
       .then((response) => response.json())
       .then((data) => console.log(data));
}

async function apilogin(dataloginform){
  const url = 'https://oka1kh.azurewebsites.net/api/user/login';
  const option = {
    method: 'POST',
    body: JSON.stringify(dataloginform),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const respon = await fetch(url, option)
  const statustext = await respon.statusText;
  if(statustext == "OK"){
    const us = await respon.json();
    return apigetprofile(us.data.token).then(data=>data)
  }
  else{
    return geterr().then(data=>data);   
  }
}

async function apiloginPartner(dataloginform){
  const url = 'https://oka1kh.azurewebsites.net/api/partner/login';
  const option = {
    method: 'POST',
    body: JSON.stringify(dataloginform),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const respon = await fetch(url, option)
  const statustext = await respon.statusText;
  if(statustext == "OK"){
    const us = await respon.json();
    return us;
  }
  else{
    return geterr().then(data=>data);   
  }
}

async function apigetprofile(token) {
  const url = 'https://oka1kh.azurewebsites.net/api/profiles';
  const respone = await fetch(url, {headers : {authorization: token}});
  const us = await respone.json(); 
  user1 = {
    status : us.status,
    message : us.message,
    error: us.error,
    data : us.data
  }
  return user1;
}
async function geterr() {
  user1 = {
      status : "FAIL",
      message : "Email hoặc mật khẩu không đúng !",
      error: null,
      data : {}
 }
  return user1;
}
//Signin
router.get('/setbody/signin', function(req, res, next) {
  res.render('setbody/signin', {user1:user1});
});
router.post('/setbody/signin', function(req, res, next) {
  var lastname1 = req.body.LastName;
  var firstname1 = req.body.FirstName;
  var email1 = req.body.Email;
  var phone1 = req.body.Phone;
  var card1 = req.body.Cards;
  var address1 = req.body.Address;
  var pass1 = req.body.Password;
  apijs.query(`INSERT INTO Users (email, pass, fristName, lastName, phone, userAddress, cards) VALUES(N'${email1}',N'${pass1}',N'${firstname1}',N'${lastname1}','${phone1}',N'${address1}','${card1}')`,function(err){
    if(err) throw err;           
      res.redirect("/setbody/login");
  })
});


//logout
router.get('/setbody/logout', function(req, res, next) {
    user1 = { 
      status: "",
      message : "",
      error: null,
      data: {}
    };
    user2 = { 
      data: {},
      status: "",
      message : "",
      error: null,
      token: "",
      refreshToken: "" 
    };
    res.redirect("/") 
});

//History
router.get('/setbody/history', function(req, res, next) {
  dbconnect.connect().then(() => {
    dbconnect.query("SELECT * FROM VEMAYBAY v, CHUYENBAY c, LOAIVE l, MAYBAY m, HANGMAYBAY h, DATVE_API dv WHERE v.idLoaiVe = l.idLoaiVe AND v.idChuyenBay = c.idChuyenBay AND c.idMayBay = m.idMayBay AND m.idHang = h.idHang AND dv.idVe = v.idVe",function(err, result){
      if(err) throw err;
      else{
        res.render('setbody/history', {result: result, user1:user1, user2: user2});
      }
    }) 
  })
});
//About
router.get('/setbody/about', function(req, res, next) {
  res.render('setbody/about', {user1:user1, user2:user2});
});
//Contact
router.get('/setbody/contact', function(req, res, next) {
  res.render('setbody/contact', {user1: user1, user2:user2});
});
//Promotion
router.get('/setbody/promotion', function(req, res, next) {
  dbconnect.connect().then(() => {
    dbconnect.query(`SELECT * FROM KHUYENMAI`,function(err, result){
      if(err) throw err;
      else{
        res.render('setbody/promotion', {result: result, user1: user1, user2: user2});
      }
    }) 
  })
});



//PARTNERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
//HOME
router.get('/home/index', function(req, res, next) {
  res.render('admin/home/index', {user1:user1, user2: user2});
});
/*PLANE */
/* GET DATABASE. */
router.get('/plane/index', function(req, res, next) {
  dbconnect.connect().then(() => {
    dbconnect.request().query('SELECT * FROM MAYBAY mb, HANGMAYBAY hb WHERE mb.idHang = hb.idHang',(err, result) => {      
      if(err) throw err;               
      res.render('admin/plane/index', {result:result, user1:user1, user2: user2});
    }) 
  })
}); 
  //----ADD Plane---
  router.get('/plane/add', function(req, res, next) {
    dbconnect.connect().then(() => {
      dbconnect.request().query('SELECT * FROM HANGMAYBAY',(err, result) => {      
        if(err) throw err;               
        res.render('admin/plane/add', {result:result, user1:user1, user2: user2});
      }) 
    })
  });
  router.post('/plane/add', function(req, res, next) {
    var idmaybay = randomId(len, pattern);
    var idhang = req.body.idHang.split(" ");
    dbconnect.query(`INSERT INTO MAYBAY (idMayBay,TenMayBay,idHang,SoLuongKhach) VALUES('${idmaybay}','${req.body.TenMayBay}','${idhang[0]}','${req.body.SoLuongKhach}')`,function(err){
      if(err) throw err;
      res.redirect("/plane/index");
    })
  });
  
  //----DELETE Plane---
  router.get('/plane/delete/:idMayBay', function(req, res, next) {
    dbconnect.query(`DELETE FROM MAYBAY WHERE idMayBay = '${req.params.idMayBay}'`,function(err){
      if(err) throw err;      
      res.redirect("/plane/index");
      })
  });
  
  //----EDIT Plane---
  router.get('/plane/edit/:idMayBay', function(req, res, next) {
    dbconnect.query(`SELECT * FROM MAYBAY mb, HANGMAYBAY hb WHERE mb.idHang = hb.idHang AND idMayBay = '${req.params.idMayBay}'`,function(err, result){
      if(err) throw err;
      console.log(result);
      dbconnect.request().query('SELECT * FROM HANGMAYBAY',(err, result2) => {      
        if(err) throw err;              
        res.render("admin/plane/edit", {result: result, result2: result2, user1:user1, user2: user2});
      })
    })
  });
  router.post('/plane/edit', function(req, res, next) {
    var idhang = req.body.idHang.split(" ");
    dbconnect.query(`UPDATE MAYBAY SET TenMayBay = '${req.body.TenMayBay}', idHang = '${idhang[0]}', SoLuongKhach = '${req.body.SoLuongKhach}' WHERE idMayBay = '${req.body.idMayBay}'`,function(err){
      if(err) throw err;
      res.redirect("/plane/index");
    })
  });

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

/*FLIGTH */
/* GET DATABASE. */
router.get('/flight/index', function(req, res, next) {
  dbconnect.connect().then(() => {
    dbconnect.query("SELECT * FROM CHUYENBAY cb, MAYBAY mb, HANGMAYBAY hb WHERE cb.idMayBay = mb.idMayBay AND mb.idHang = hb.idHang",function(err, result){
      if(err) throw err;
      else{
        res.render('admin/flight/index', {result: result, user1:user1, user2: user2});
      }
    }) 
  })
});


//----ADD Flight---
router.get('/flight/add', function(req, res, next) {
  dbconnect.connect().then(() => {
    dbconnect.query("SELECT * FROM MAYBAY mb, HANGMAYBAY hb WHERE mb.idHang = hb.idHang",function(err, result){
      if(err) throw err;
      else{
        res.render('admin/flight/add', {result: result, user1:user1, user2: user2});
      }
    }) 
  })
});

router.post('/flight/add', function(req, res, next) {
  var idmaybay = req.body.idMayBay.split(" ");
  var idchuyenbay = randomId(len, pattern);
  console.log(req.body.NoiDen + req.body.NoiDi);
  dbconnect.query(`INSERT INTO CHUYENBAY (idChuyenBay, NgayBay, GioBay, GioDen, NoiDi, NoiDen, idMayBay) VALUES('${idchuyenbay}','${req.body.NgayBay}','${req.body.GioBay}','${req.body.GioDen}',N'${req.body.NoiDi}',N'${req.body.NoiDen}','${idmaybay[0]}')`,function(err){
    if(err) throw err;
    res.redirect("/flight/index");
  })
});

//----DELETE Flight---
router.get('/flight/delete/:idChuyenBay', function(req, res, next) {
  dbconnect.query(`DELETE FROM CHUYENBAY WHERE idChuyenBay = '${req.params.idChuyenBay}'`,function(err){
    if(err) throw err;
    res.redirect("/flight/index");
    })
});

//----EDIT Flight---
router.get('/flight/edit/:idChuyenBay', function(req, res, next) {
  dbconnect.query(`SELECT * FROM CHUYENBAY cb, MAYBAY mb, HANGMAYBAY hb WHERE cb.idMayBay = mb.idMayBay AND mb.idHang = hb.idHang AND idChuyenBay = '${req.params.idChuyenBay}'`,function(err, result){
    if(err) throw err;
    dbconnect.request().query('SELECT * FROM MAYBAY, HANGMAYBAY WHERE MAYBAY.idHang = HANGMAYBAY.idHang',(err, result2) => {      
      if(err) throw err;              
      res.render("admin/flight/edit", {result: result, result2: result2, user1:user1, user2: user2});
    })             
  })
});
router.post('/flight/edit', function(req, res, next) {
  var idmaybay = req.body.idMayBay.split(" ");
    dbconnect.query(`UPDATE CHUYENBAY SET NgayBay = '${req.body.NgayBay}', GioBay = '${req.body.GioBay}', GioDen = '${req.body.GioDen}', NoiDi = N'${req.body.NoiDi}', NoiDen = N'${req.body.NoiDen}', idMayBay = '${idmaybay[0]}' WHERE idChuyenBay = '${req.body.idChuyenBay}'`,function(err){     
    if(err) throw err;       
    res.redirect("/flight/index");
    })    
});

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

/*TICKET */
/* GET DATABASE. */
router.get('/ticket/index', function(req, res, next) {
  dbconnect.connect().then(() => {
    dbconnect.query("SELECT * FROM VEMAYBAY v, CHUYENBAY c, LOAIVE l, MAYBAY m, HANGMAYBAY h WHERE v.idLoaiVe = l.idLoaiVe AND v.idChuyenBay = c.idChuyenBay AND c.idMayBay = m.idMayBay AND m.idHang = h.idHang",function(err, result){
      if(err) throw err;
      else{
        res.render('admin/ticket/index', {result: result, user1:user1, user2: user2});
      }
    }) 
  })
});

//----ADD Ticket---
router.get('/ticket/add', function(req, res, next) {
  dbconnect.connect().then(() => {
    dbconnect.query(`SELECT * FROM CHUYENBAY c, MAYBAY m, HANGMAYBAY h WHERE c.idMayBay = m.idMayBay AND m.idHang = h.idHang`,function(err, result){
      if(err) throw err;
      else{
        res.render('admin/ticket/add', {result: result, user1:user1, user2: user2});
      }
    }) 
  })
});

router.post('/ticket/add', function(req, res, next) {
  var idcb = req.body.idChuyenBay.split(" ");
  var idloaive = "";
  var sove = 4 //db giả tạo thử 4 vé trên 1 chuyến
  for(var i = 0; i<sove; i++){
    var idVe = randomId(len, pattern);
    if(i==0){
        idloaive = "lv004";
    }
    else if(i==1){
      idloaive = "lv003";
    }
    else if(i==2){
      idloaive = "lv002";
    }
    else{
      idloaive = "lv001";
    }
    dbconnect.query(`INSERT INTO VEMAYBAY (idVe, idChuyenBay, idLoaiVe, SoKgHanhLy, GiaVe) VALUES('${idVe}','${idcb[0]}','${idloaive}','${req.body.SoKgHanhLy}','${req.body.GiaVe}')`,function(err){})
  }
  res.redirect("/ticket/index");
});

//----DELETE Ticket---
router.get('/ticket/delete/:idVe', function(req, res, next) {
  dbconnect.query(`DELETE FROM VEMAYBAY WHERE idVe = '${req.params.idVe}'`,function(err){
    if(err) throw err;
    res.redirect("/ticket/index");
    })
});

//----EDIT Ticket---
router.get('/ticket/edit/:idVe', function(req, res, next) {
  dbconnect.query(`SELECT * FROM VEMAYBAY v, CHUYENBAY c, LOAIVE l, MAYBAY m, HANGMAYBAY h WHERE v.idLoaiVe = l.idLoaiVe AND v.idChuyenBay = c.idChuyenBay AND c.idMayBay = m.idMayBay AND m.idHang = h.idHang AND v.idVe = '${req.params.idVe}'`,function(err, result){
    if(err) throw err;
    dbconnect.request().query(`SELECT * FROM LOAIVE`,(err, result2) => {      
      if(err) throw err;              
      dbconnect.request().query(`SELECT * FROM CHUYENBAY c, MAYBAY m, HANGMAYBAY h WHERE c.idMayBay = m.idMayBay AND m.idHang = h.idHang`,(err, result3) => {      
        if(err) throw err;              
        res.render("admin/ticket/edit", {result: result, result2: result2, result3: result3, user1:user1, user2: user2});
      })
    })
  })
});

router.post('/ticket/edit', function(req, res, next) {
    var idcb = req.body.idChuyenBay.split(" ");
    var idlv = req.body.idLoaiVe.split(" ");
    dbconnect.query(`UPDATE VEMAYBAY SET SoKgHanhLy = '${req.body.SoKgHanhLy}', GiaVe = '${req.body.GiaVe}', idChuyenBay = '${idcb[0]}', idLoaiVe = '${idlv[0]}' WHERE idVe = '${req.body.idVe}'`,function(err){     
    if(err) throw err;       
    res.redirect("/ticket/index");
    })    
});


module.exports = router;
