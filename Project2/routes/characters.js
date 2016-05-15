var express = require('express');
var router = express.Router();
var charDal = require('../model/char_dal');

router.get('/all', function(req, res) {
    charDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayAllCharacters.ejs', {rs: result});
        })
});


router.get('/', function (req, res) {
    charDal.GetByID(req.query.char_id, function(err, result) {
        if(err) throw err;
        res.render('displayCharacterInfo.ejs', {rs:result, char_id: req.char_id});
    });
});


module.exports = router;