const mongoose = require('mongoose');

let Customer = new mongoose.Schema({
    customer_name : {
        type : String,
        require : true
    },
    customer_mn : {
        type : String,
        require : true
    },
    customer_mail : {
        type : String,
        require : true
    },
})

const useCustomer_model = mongoose.model("customers",Customer)

module.exports = useCustomer_model;