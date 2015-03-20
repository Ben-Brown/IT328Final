var express = require('express');
var router = express.Router();

/* GET Contact List page. */
router.get('/contactlist', function(req, res) {
		var db = req.db;
		var collection = db.get('contact');
		collection.find({},{},function(e,docs){
		res.render('contactlist', {'contactlist' : docs});
	});
});

/* GET Add a New Contact page. */
router.get('/newcontact', function(req, res) {
 res.render('newcontact', { title: 'Add a New Contact', message: '', errors:{} });
});

/* GET edit contact */
router.get('/edit/:ID', function(req, res){
  var db = req.db;
  var collection = db.get('contact');
  collection.findOne({_id: req.params.ID}, function(err, contact){
    res.render('/editcontact', {"contact":contact});
  });
});

/* POST reqst to edit contact*/
router.post('/editcontact/:ID', function(req,res){
  var db= req.db;
  var collection = db.get('contact');
  if(req.body.button == "no"){
    res.location("/editcontact");
    res.redirect("/editcontact");
  } else {

  // Get form values
 var fname = req.body.fname;
 var lname = req.body.lname;
 var email = req.body.email;
 var phone = req.body.phone;
 var company = req.body.company;
 var title = req.body.title;
 var date = req.body.DATE;
 var whereMet = req.body.whereMet;
 var comments = req.body.comments;

 collection.update(
  {_id: req.params.ID},
  {
   "name" : {"first": fname, "last" : lname},
   "email": email,
   "phone": phone,
   "company": company,
   "title": title,
   "date": date,
   "wheremet": whereMet,
   "comments": comments
 },function(err){
   if(err){
     res.send(err);
   } else {
     res.location("/editcontact");
     res.redirect("/editcontact");
   }
 });
}
  
});

/* GET delete contact */
router.get('/deletecontact', function(req, res){
  var db = req.db;
  var collection = db.get('contact');
  collection.findOne({_id: req.params.ID}, function(err, contact){
    res.render('/deletecontact', {"contact":contact});
  });
});

/* POST reqst to delete contact*/
router.post('/deletecontact', function(req,res){
  var db= req.db;
  var collection = db.get('contact');
  if(req.body.button == "no"){
    res.location("/");
    res.redirect("/");
  } else {
  collection.remove(
  {_id: req.params.ID},
  {
    justOne: true  
  },function(err){
    if(err){
      res.send(err);
    } else {
      res.location("/");
      res.redirect("/");
    }
  });
}
});

/* POST to Add Contact*/
router.post('/addcontact', function(req, res) {


var date = req.body.DATE;
/*
//Check for date
if(!date){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();

	if(dd<10){
		dd='0'+dd
	}
	if(mm<10){
		mm='0'+mm
	}

	date = mm+'/'+dd+'/'+yyyy;

}*/
//var errors = req.validationErrors();
var db = req.db;

// Get form values
var fname = req.body.fname;
var lname = req.body.lname;
var email = req.body.email;
var phone = req.body.phone;
var company = req.body.company;
var title = req.body.title;
var date = req.body.DATE;
var whereMet = req.body.whereMet;
var comments = req.body.comments;

//Set Collection
var collection = db.get('contact');

//Subimt to DB
collection.insert({
	"name" : {"first" : fname, "last" : lname},
	"email" : email,
	"phone" : phone,
	"company": company,
	"title": title,
	"date" : date,
	"whereMet" : whereMet,
	"comments" : comments
}, function (err, doc){
	if(err){
		//Return error upon fail
		res.send("There was a problem adding the information to the database.")
	}
	else {
		res.location("/contactlist");
		res.redirect("/contactlist");
	}
	});
	


});

module.exports = router;