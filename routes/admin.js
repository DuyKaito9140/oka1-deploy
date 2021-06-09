var express = require('express');
var router = express.Router();
var dbconnect = require("../database/sql")
var randomId = require('random-id');
var len = 12;
var pattern = 'A0'

//HOME
router.get('/home/index', function(req, res, next) {
  res.render('admin/home/index', { pagetitle: 'Home' });
});
/*PLANE */
/* GET DATABASE. */
router.get('/plane/index', function(req, res, next) {
  dbconnect.connect().then(() => {
    dbconnect.request().query('SELECT * FROM MAYBAY mb, HANGMAYBAY hb WHERE mb.idHang = hb.idHang',(err, result) => {      
      if(err) throw err;               
      res.render('admin/plane/index', {result:result});
    }) 
  })
}); 
  //----ADD Plane---
  router.get('/plane/add', function(req, res, next) {
    dbconnect.connect().then(() => {
      dbconnect.request().query('SELECT * FROM HANGMAYBAY',(err, result) => {      
        if(err) throw err;               
        res.render('admin/plane/add', {result:result});
      }) 
    })
  });
  router.post('/plane/add', function(req, res, next) {
    var idmaybay = randomId(len, pattern);
    var idhang = req.body.idHang.split(" ");
    dbconnect.query(`INSERT INTO MAYBAY (idMayBay,TenMayBay,idHang,SoLuongKhach) VALUES('${idmaybay}','${req.body.TenMayBay}','${idhang[0]}','${req.body.SoLuongKhach}')`,function(err){
      if(err) throw err;
      res.redirect("/admin/plane/index");
    })
  });
  
  //----DELETE Plane---
  router.get('/plane/delete/:idMayBay', function(req, res, next) {
    dbconnect.query(`DELETE FROM MAYBAY WHERE idMayBay = '${req.params.idMayBay}'`,function(err){
      if(err) throw err;      
      res.redirect("/admin/plane/index");
      })
  });
  
  //----EDIT Plane---
  router.get('/plane/edit/:idMayBay', function(req, res, next) {
    dbconnect.query(`SELECT * FROM MAYBAY mb, HANGMAYBAY hb WHERE mb.idHang = hb.idHang AND idMayBay = '${req.params.idMayBay}'`,function(err, result){
      if(err) throw err;
      console.log(result);
      dbconnect.request().query('SELECT * FROM HANGMAYBAY',(err, result2) => {      
        if(err) throw err;              
        res.render("admin/plane/edit", {result: result, result2: result2});
      })
    })
  });
  router.post('/plane/edit', function(req, res, next) {
    var idhang = req.body.idHang.split(" ");
    dbconnect.query(`UPDATE MAYBAY SET TenMayBay = '${req.body.TenMayBay}', idHang = '${idhang[0]}', SoLuongKhach = '${req.body.SoLuongKhach}' WHERE idMayBay = '${req.body.idMayBay}'`,function(err){
      if(err) throw err;
      res.redirect("/admin/plane/index");
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
        res.render('admin/flight/index', {result: result});
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
        res.render('admin/flight/add', {result: result});
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
    res.redirect("/admin/flight/index");
  })
});

//----DELETE Flight---
router.get('/flight/delete/:idChuyenBay', function(req, res, next) {
  dbconnect.query(`DELETE FROM CHUYENBAY WHERE idChuyenBay = '${req.params.idChuyenBay}'`,function(err){
    if(err) throw err;
    res.redirect("/admin/flight/index");
    })
});

//----EDIT Flight---
router.get('/flight/edit/:idChuyenBay', function(req, res, next) {
  dbconnect.query(`SELECT * FROM CHUYENBAY cb, MAYBAY mb, HANGMAYBAY hb WHERE cb.idMayBay = mb.idMayBay AND mb.idHang = hb.idHang AND idChuyenBay = '${req.params.idChuyenBay}'`,function(err, result){
    if(err) throw err;
    dbconnect.request().query('SELECT * FROM MAYBAY, HANGMAYBAY WHERE MAYBAY.idHang = HANGMAYBAY.idHang',(err, result2) => {      
      if(err) throw err;              
      res.render("admin/flight/edit", {result: result, result2: result2});
    })             
  })
});
router.post('/flight/edit', function(req, res, next) {
  var idmaybay = req.body.idMayBay.split(" ");
    dbconnect.query(`UPDATE CHUYENBAY SET NgayBay = '${req.body.NgayBay}', GioBay = '${req.body.GioBay}', GioDen = '${req.body.GioDen}', NoiDi = N'${req.body.NoiDi}', NoiDen = N'${req.body.NoiDen}', idMayBay = '${idmaybay[0]}' WHERE idChuyenBay = '${req.body.idChuyenBay}'`,function(err){     
    if(err) throw err;       
    res.redirect("/admin/flight/index");
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
        res.render('admin/ticket/index', {result: result});
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
        res.render('admin/ticket/add', {result: result});
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
  res.redirect("/admin/ticket/index");
});

//----DELETE Ticket---
router.get('/ticket/delete/:idVe', function(req, res, next) {
  dbconnect.query(`DELETE FROM VEMAYBAY WHERE idVe = '${req.params.idVe}'`,function(err){
    if(err) throw err;
    res.redirect("/admin/ticket/index");
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
        res.render("admin/ticket/edit", {result: result, result2: result2, result3: result3});
      })
    })
  })
});
router.post('/ticket/edit', function(req, res, next) {
    var idcb = req.body.idChuyenBay.split(" ");
    var idlv = req.body.idLoaiVe.split(" ");
    dbconnect.query(`UPDATE VEMAYBAY SET SoKgHanhLy = '${req.body.SoKgHanhLy}', GiaVe = '${req.body.GiaVe}', idChuyenBay = '${idcb[0]}', idLoaiVe = '${idlv[0]}' WHERE idVe = '${req.body.idVe}'`,function(err){     
    if(err) throw err;       
    res.redirect("/admin/ticket/index");
    })    
});
  module.exports = router;
  
  