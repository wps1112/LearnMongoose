var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/test');
var userModel = require('../model/user');
var User = userModel.User;

var messageModel = require('../model/Message')
var Message = messageModel.Message;

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', {title: 'fdfdf'});
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
    Message.find({}, function (err, docs) {
            if (err) {
                console.error("erro");
            }
            else {
                console.log(docs);
                res.render('Login', {
                    data: docs
                });
            }
        }
    ).limit(8);

});
module.exports = router;
