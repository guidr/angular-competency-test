var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    sex : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    dateCreated : {
        type : Date,
        required : true,
        default : Date.now
    }
});

module.exports = mongoose.model('UserData', Schema);
