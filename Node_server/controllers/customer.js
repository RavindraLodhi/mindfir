const express = require('express');
const Router = express.Router();
const costomer = require('../models/customers.js')
 const mongo = require('mongodb')
// const nodemailer = require('nodemailer');
const { validationResult, check } = require("express-validator");



Router.get('/:id', (req, res) => {
    costomer.findById(req.params.id, function (err, UserDetails) {
        if (err) return next(err);
        res.send(UserDetails);
    })
})

Router.post('/', [
    check("name").not().isEmpty().trim().escape(),
], (req, res) => {
    var body = req.body;
    const errors = validationResult(req)
    if (body.flag == 1) {
        costomer.find({}, (err, data) => {
            if (!err) {
                res.send({
                    result: 1,
                    massage: 'customer Records found.',
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
    }
    else if (body.flag == 2) {
        console.log("flage 2");
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                massage: 'From validation error.',
                error: errors.array(),
                "result": 1,
            })
        }
        else {
            let costomerbody = new costomer({
                customer_name: body.name,
                customer_mail: body.email,
                customer_mn: body.MobileNo
            })
            console.log(costomerbody);
            costomerbody.save((err, data) => {
                if (!err) {
                    res.send({
                        "massage": "Profile Ragistration successfully",
                        "result": 1,
                        "data": data
                    })
                }
                else {
                    res.send({
                        "massage": "Something went wrong.",
                        "result": 0,
                        "data": data
                    })
                }
            })
        }
    }
    else {
        res.send({
            massage: "something went wrong",
            result: 0
        })
    }
})


Router.delete("/:id", async  (req, res,next) => {
    var param = req.params;
    console.log(param.id);
    if(param.id != "" && param.id != undefined){
        await  costomer.deleteOne({ _id: new mongo.ObjectId(param.id)},(err,data)=>{
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


Router.put("/", (req, res) => {
    res.send("welcome to put")
})


module.exports = Router;