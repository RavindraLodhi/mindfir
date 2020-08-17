const mongoose = require('mongoose');

let User = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    mabileNo :{
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password :{
        type : String,
        require : true
    }
})

const user_model = mongoose.model("Users",User)

module.exports = user_model;