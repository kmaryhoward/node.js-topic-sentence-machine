var express = require('express');
var router = express.Router();

/* GET authors listing. */
router.get('/authorslist', function(req, res) {
    var db = req.db;
    var collection = db.get('authorslist');
    collection.find({},{},function(e,docs){
	res.json(docs);
    });
});
/* POST to add author*/
router.post('/addauthor', function(req, res) {
    var db = req.db;
    var collection = db.get('authorslist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
}); 

 /* DELETE to deleteauthor */
router.delete('/deleteauthor/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('authorslist');
    var authorToDelete = req.params.id;
    collection.remove({ '_id' : authorToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
