const mongoose = require('mongoose');

let product = new mongoose.Schema({
    product_title : {
        type : String,
        require : true
    },
    quantity_total :{
        type : Number,
        require : true
    },
    quantity_booked : {
        type : Number,
        require : true
    },
    price :{
        type : Number,
        require : true
    }
})

const product_model = mongoose.model("products",product)

module.exports = product_model;