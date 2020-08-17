const express = require('express');
const Router = express.Router();
const user = require('../models/users');
var costumer = require('../models/customers');
// const nodemailer = require('nodemailer');
const { body, validationResult, check } = require("express-validator");

Router.get('/:id', (req, res) => {
    user.findById(req.params.id, function (err, UserDetails) {
        if (err) return next(err);
        res.send(UserDetails);
    })
})


Router.post('/', [
    check("user").not().isEmpty().trim().escape(),
    check("password").not().isEmpty().trim().escape(),
    // check("mobileNo").not().isEmpty().trim().escape(),
], (req, res) => {
   
    var body = req.body;
    console.log("req",body);
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            massage: 'From validation error.',
            error: errors.array()
        })
    }
    else {
        if (body.user == 'Admin' && body.password == '1234') {
            res.send({
                "massage": "Profile Ragistration successfully",
                "result": 1,
                "data": "12334"
            })
           
            }
            else{
                res.send({
                    "massage": "crediatial did not match",
                    "result": 0,
                    "data": []
            })
        }

    }
})


Router.delete("/", (req, res) => {
    res.send("welcome to get")
})

Router.put("/", (req, res) => {
    res.send("welcome to put")
})


module.exports = Router;