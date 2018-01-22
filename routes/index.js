var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ideaslist', function(req, res) {
  var db = req.db;
  var collection = db.get('ideaslist');
  collection.find({},{},function(e,docs) {
    res.render('ideaslist', {
      "ideaslist" : docs
    });
  });
});

router.get('/newauthor', function(req, res) {
  res.render('newauthor', { title: 'Add New Author' });
});

router.post('/addauthor', function(req, res) {
  var db = req.db;

  var authorName = req.body.authorname;
  var authorAction = req.body.authoraction;
  var authorObject = req.body.authorobject;

  var collection = db.get('ideaslist');

  collection.insert({
    "author" : authorName,
    "action" : authorAction,
    "object" : authorObject
  }, function (err, doc) {
    if (err) {
      res.send("There was a problem adding the information to the database");
    } else {
      res.redirect("ideaslist");
    }
  });
});

module.exports = router;
