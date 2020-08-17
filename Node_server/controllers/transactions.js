const express = require('express');
const Router = express.Router();
const products = require('../models/transaction.js')
const updateQua = require('../models/products')
const mongo = require('mongodb')

// const nodemailer = require('nodemailer');
const { body, validationResult, check } = require("express-validator");

Router.get('/:id', (req, res) => {
    product.findById(req.params.id, function (err, UserDetails) {
        if (err) return next(err);
        res.send(UserDetails);
    })
})


Router.post('/', [
    check("product_id").not().isEmpty().trim().escape(),
    check("customer_id").not().isEmpty().trim().escape(),
], (req, res) => {
    var body = req.body;
    if (body.flag == 1) {
        products.find({}, (err, data) => {
            if (!err) {
                res.send({
                    result: 1,
                    massage: 'product Records found.',
                    data: data
                })
            }
            else {
                res.send({
                    "massage": "Something went",
                    "result": 0,
                    "data": data
                })
            }
        })
    }
    else if (body.flag == 2) {
        console.log(body);
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                massage: 'From validation error.',
                error: errors.array()
            })
        }
        else {
            let addProduct = new products({
                customer_id: body.customer_id,
                product_id: body.product_id,
                transation_type: body.transation_type,
                quantity: body.quantity,
                transation_id_parent: body.transation_id_parent,
            })
            addProduct.save((err, data) => {
                if (!err) {
                    updateQua.update({'_id':new mongo.ObjectId(body.product_id)},{$set:{'quantity_booked':body.book_quantity}},(err,data =>{
                        if(!err){
                            res.send({
                                "massage": "Transaction successfully",
                                "result": 1,
                                "data": data
                            })
                        }
                        else{

                        }
                    }))

                   
                }
                else {
                }
            })
        }
    }
    else if (body.flag == 3) {
        console.log(body.customer_id);
        products.find({ "customer_id": body.customer_id }, (err, data) => {
            console.log(err);
            console.log(data);
            if (!err) {
                res.send({
                    result: 1,
                    massage: 'product Records found.',
                    data: data
                })
            }
            else {
                res.send({
                    "massage": "Something went",
                    "result": 0,
                    "data": data
                })
            }
        })

    }
    else {

    }

})


Router.delete("/:id", async (req, res, next) => {
    var param = req.params;
    console.log(param.id);
    if (param.id != "" && param.id != undefined) {
        await products.deleteOne({ _id: new mongo.ObjectId(param.id) }, (err, data) => {
            console.log(err);
            console.log(data);
            if (err) {
                next()
            }
            res.json({
                result: 1,
                massage: "deleted succesfully"
            })
        })
    }
})


Router.put("/", (req, res) => {
    res.send("welcome to put")
})


module.exports = Router;