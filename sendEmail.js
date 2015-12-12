/**
 * Created by pc on 2015/12/12.
 */

var email = require('config.js').email;
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: email.host,
    secureConnection: true, // use SSL
    auth: {
        user: email.user,
        pass: email.password
    }
});

/**
 * �����ʼ�
 * @param contents
 */
module.exports = function (contents) {
    transporter.sendMail({
        from: email.user,
        to: email.toUser,
        subject: 'checkIn success!',
        text: contents || 'is test!'
    }, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.response);
        }

        transporter.close(); // ���û�ã��ر����ӳ�
    });
};