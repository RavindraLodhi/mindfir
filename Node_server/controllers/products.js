const express = require('express');
const Router = express.Router();
const products = require('../models/products.js')
const mongo = require('mongodb')
// const nodemailer = require('nodemailer');
const { body,validationResult, check } = require("express-validator");


Router.get('/:id',(req,res)=>{
    product.findById(req.params.id, function (err, UserDetails) {
        if (err) return next(err);
        res.send(UserDetails);
    })
})

Router.post('/',[
    check("quantity_total").not().isEmpty().trim().escape(),
    check("product_title").not().isEmpty().trim().escape(),
    check("quantity_booked").not().isEmpty().trim().escape(),
    check("price").not().isEmpty().trim().escape()
], (req, res) => {
    var body = req.body;
     const errors = validationResult(req) 
   if(body.flag == 2){
    products.find({}, (err, data) => {
        if (!err) {
            res.send({
                result: 1,
                massage: 'product Records found.',
                data: data
            })
        }
        else{
            res.send({
                "massage" :"Something went",
                "result" : 0,
                "data" : data
             })
        }
    })
   }else if(body.flag == 1){
    if(!errors.isEmpty()){
        return res.status(422).json({
            status : false,
            massage :  'From validation error.',
            error : errors.array()
        })
    }
    else{
        console.log("runnib=ng flage 1");
            let addProduct = new products({
                quantity_total: body.quantity_total,
                product_title: body.product_title,
                quantity_booked: body.quantity_booked,
                price : body.price
            })
            addProduct.save((err,data)=>{
                console.log(data);
               if(!err){
               res.send({
                  "massage" :"Profile Ragistration successfully",
                  "result" : 1,
                  "data" : data
               })
               }
               else{
               }
            })
    }

   }
   else{

   }

  
})

Router.delete("/:id", async  (req, res,next) => {
    var param = req.params;
    console.log(param.id);
    if(param.id != "" && param.id != undefined){
        await  products.deleteOne({ _id: new mongo.ObjectId(param.id)},(err,data)=>{
            console.log(err);
            console.log(data);
            if(err){
                next()
            }
            res.json({
                result :1,
                massage : "deleted succesfully"
            })
        })
    }
})


Router.put("/",(req,res)=>{
    res.send("welcome to put")
})


module.exports = Router;