var express = require('express');
var router = express.Router();

//上传
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

//加密
var bcrypt = require('bcrypt-nodejs');
//发送邮件
var nodemailer = require("nodemailer");

//数据库操作
var mongoose = require('mongoose');
var dbInfo = require('../config').dbInfo;
mongoose.connect(dbInfo.url);
var userModel = require('../model/user');
var User = userModel.User;
var messageModel = require('../model/Message');
var Message = messageModel.Message;


/* GET home page. */
//session机制。当访问index页面时，先判断是否登陆过。
router.get('/', function(req, res, next) {
    if (req.session.user) {
        res.render('index');
    } else {
        req.session.error = "请先登录";
        res.redirect('login');
    }

});

//上传功能实现前，表单。然后对表单属性进行。action规定了路由处理的路径。
// form(method='post', action='/file/uploading', enctype='multipart/form-data')enctype传输的格式，文件上传时用multipart/form-data
//input(name='inputFile', type='file', multiple='mutiple') multiple='mutiple'多选文件
//input(name='btnUp', type='submit',value='上传')
router.post('/file/uploading', function (req, res) {
//生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/files/'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {

            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;
            var dstPath = './public/files/' + inputFile.originalFilename;
            //重命名为真实文件名
            /* fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
             });*/
        }
        //这个地方可以处理opencv的图像处理文件。

        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.write('您');
        res.end('上传成功');
    });


});

//2015年12月12日添加发送邮件的功能
//需要注意的是，nodemailer使用的版本是0.7.1
router.get('/admin', function (req, res, next) {
    /*var transport = nodemailer.createTransport("SMTP", {
        service: 'qq',
        auth: {
            user: "nvnv_1988@qq.com",
            pass: "wps1112"
        }
    });

    transport.sendMail({
        from: "<569456351@qq.com>",
        to: "<569456351@qq.com>",
        subject: "办理北斗卡相关事宜",
        generateTextFromHTML: true,
        html: "非常荣幸的通知您，您的北斗卡办理成功！"
    }, function (error, response) {
        if (error) {
            console.log('发送失败！' + error);
        } else {
            console.log("Message sent: " + response.message);
        }
        transport.close();
    });
     */
    res.render('admin', {title: '管理界面'});
});


router.post('/Login', function (req, res) {
    var user = {
        username: '569456351@qq.com',
        password: '123456'
    }
    if (req.body.useremail === user.username && req.body.userpassword === user.password) {
        req.session.user = user;
        res.redirect('/');
    }
    res.redirect('/Login');

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

router.get('/reg', function (req, res) {
    res.render('reg', {title: '注册界面'});
});

router.post('/reg', function (req, res) {
    //注册功能
    //'获取post请求'表单数据
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
            //req.flash('success', '注册成功!');
            res.redirect('/');//注册成功后返回主页


        }

    });

});


module.exports = router;
