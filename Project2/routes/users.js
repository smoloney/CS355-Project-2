var express = require('express');
var router = express.Router();
var userDal = require('../model/users_dal');


router.get('/save', function (req, res, next) {
  userDal.Insert(req.query, function (err, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.send("Successfully Saved User.");
    }
  });
});
router.get('/create', function(req, res){
  res.render('NewUser.ejs', {title: "Create New User"});
});

router.get('/edit', function(req, res){
  console.log('/edit user_id:' + req.query.user_id);

  userDal.GetByID(req.query.user_id, function(err, user_result){
    if(err) {
      console.log(err);
      res.send('error: ' + err);
    }
    else {
      console.log(user_result);
      userDal.GetAll(function(err, user_result){
        console.log(user_result);
        res.render('user_edit_form.ejs', {rs: user_result, users: user_result, message: req.query.message});
      });
    }
  });
});

router.post('/update_user', function(req,res){
  console.log(req.body);
  
  userDal.Update(req.body.user_id, req.body.firstname, req.body.lastname, req.body.username, req.body.email, req.body.role, req.body.password,
      function(err) {
        var message;
        if (err) {
          console.log(err);
          message = 'error: ' + err.message;
        }
        else {
          message = 'success';
        }
        res.redirect('/users/edit?user_id=' + req.body.user_id + '&message=' + message);
      });
});

router.get('/all', function(req, res){
userDal.GetAll(function(err, result){
  if(err) throw err;
  
  res.render('displayAllUsers.ejs', {rs: result});
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/delete', function(req, res){
  console.log(req.query);
  userDal.GetByID(req.query.user_id, function(err, result) {
    if(err){
      res.send("Error: " + err);
    }
    else if(result.length != 0) {
      userDal.DeleteById(req.query.user_id, function (err) {
        res.send(' Successfully Deleted');
      });
    }
    else {
      res.send('User does not exist in the database.');
    }
  });
});

module.exports = router;
