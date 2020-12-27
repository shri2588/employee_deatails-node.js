var express = require('express');
var empmodel = require('../modules/employee')
var router = express.Router();

var employees= empmodel.find({})

/* GET home page. */
router.get('/', function(req, res, next) {
  employees.exec(function(err,data){
    if(err) throw err;
    res.render('index', { title: 'employee records' , records:data,msg:''});
  })
 
});

router.post("/",function(req,res, next){
var empDetails = new empmodel({
  name: req.body.uname,
  email:req.body.email,
  etype: req.body.emptype,
  hourlyrate: req.body.hrlyrate,
  totalHour: req.body.ttlhr,
  total:parseInt(req.body.hrlyrate) * parseInt(req.body.ttlhr),

});

empDetails.save(function(err,res1){
  if(err) throw err;
  employees.exec(function(err,data){
    if(err) throw err;
    res.render('index', { title: 'employee records' , records:data, msg:'Register Successfully'});
  });

});

  

});

router.post('/search/', function(req, res, next) {
  var byName = req.body.fltrname;
  var byEmail = req.body.fltremail;
  
  if(byName != '' && byEmail != '')
  {
    fPara = { 
      $and:[{name: byName},{email:byEmail}]
    }
  }
  else if(byName != '' && byEmail == '')
  {
    fPara = { 
      $or:[{name: byName},{email:byEmail}]
    }
  }
  else if(byName == '' && byEmail != '')
  {
    fPara = { 
      $or:[{name: byName},{email:byEmail}]
    }
  }
  else
  {
    fPara={}
  }
    var studentFilter= empmodel.find(fPara)
    studentFilter.exec(function(err,data){
      if(err) throw err;
      res.render('index', { title: 'Express',msg:'',records:data});
    });
});
  


module.exports = router;
