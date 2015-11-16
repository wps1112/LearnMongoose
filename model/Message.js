/**
 * Created by He on 2015/11/14.
 */
var mongoose = require('mongoose');
var _messageSchema = new mongoose.Schema({
    content: String,
    time: String
});

exports.Message = mongoose.model('Message', _messageSchema);