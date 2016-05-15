var express = require('express');
var router = express.Router();
aboutDal = require('../model/about_dal');

router.get('/', function (req, res) {

    aboutDal.GetAbout(function(err, result) {
        if(err) throw err;
        res.render('displayAbout.ejs', {rs: result});
    })
});

module.exports = router;