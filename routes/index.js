var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var bcrypt = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost/test');
var userModel = require('../model/user');
var User = userModel.User;

var messageModel = require('../model/Message');
var Message = messageModel.Message;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: '河南北斗分理级服务平台'});
});

router.get('/admin', function (req, res, next) {
    res.render('/admin', {title: '河南北斗分理级服务平台'});
});


router.post('/Login', function (req, res) {

    //'获取post请求'
    var _email=req.body.useremail;
    var _password = req.body.userpassword;
    var _user=new User({
        email: _email,
        password: _password
        });

    //生成盐
    var salt = bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            console.log(err);
            return nexr(err)
        }
        else {
            console.log(salt);
            return salt;
        }
    });

    //hash散列
    bcrypt.hash(_user.password, salt, null, function (err, hash) {
        if (err) {
            return next(err);
        }
        _user.password = hash;
        console.log(_user.password);
    });

    //调用数据库模型的方法。
    _user.save(function (err) {
        if (err) {
            console.log(err);
            res.render('/Login', {title: 'Login'});
        }
        else {
            //res.render('/Login', { title: 'Login' });
            console.log('saved OK!');

        }

    });

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
