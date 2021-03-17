var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    email: {
        type: String,
        default: ''
    },
    timezone: {
        type: String,
        default: '',
    },
    atcoder: {
        type: Boolean,
        default: true,
    },
    codechef: {
        type: Boolean,
        default: true,
    },
    codeforces: {
        type: Boolean,
        default: true,
    },
    leetcode: {
        type: Boolean,
        default: true,
    },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
