var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/test');
var model=require('../model/user');
var User=model.User;

/* GET home page. */
router.get('/', function(req, res, next) {
     res.render('index', { title: 'Express' });
});

router.post('/Login', function (req, res) {
    console.log('获取post请求');
    var _name=req.body.username;
    var _email=req.body.useremail;
    var _user=new User({
        name:_name,
        email:_email
        });
  _user.save(function(err){
        if(err)
        {
          console.log(err);
            res.render('/add', { title: 'add' });
           }
        else
        {  res.redirect('index', { title: 'home' });
          console.log('saved OK!');
        }
    }

  )

});

router.get('/Login', function (req, res) {

    res.render('Login', {title: 'Login'});
});
module.exports = router;
