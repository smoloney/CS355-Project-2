var express = require('express');
var router = express.Router();
var accountDal = require('../model/users_dal.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Unoffical League of Legends Character Information' });
});



router.get('/authenticate', function(req, res) {
  accountDal.GetByEmail(req.query.email, req.query.password, function (err, account) {
    if (err) {
      res.send(err);
    }
    else if (account == null) {
      res.send("Account not found.");
    }
    else {
      res.send(account);
    }
  });
});
router.get('/login', function(req, res, next) {
  if (req.session.account) {

    res.redirect('/') // already logged in

  }

  else {
    res.render('login.ejs')
  }
});





module.exports = router;



