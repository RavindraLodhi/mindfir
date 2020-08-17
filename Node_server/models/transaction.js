const mongoose = require('mongoose');

let Transation = new mongoose.Schema({
    transation_date_time: {
        type: Date,
        default: Date.now
    },
    customer_id: {
        type: String,
        require: true
    },
    product_id: {
        type: String,
        require: true
    },
    transation_type: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    transation_id_parent: {
        type: Number,
        require: true
    }
})

const transation_model = mongoose.model("Transations", Transation)

module.exports = transation_model;