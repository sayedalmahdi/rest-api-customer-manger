const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Customer = require('../models/customer.model')

router.get("/customers", (req, res, next) => {
    Customer.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get("/customer/:id", (req, res, next) => {
    Customer.findOne({ _id: req.params.id })
        .then(doc => {
            if (doc) {
                res.status(200).json(doc)
            }
            else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post("/customer/add", (req, res, next) => {
    let customer = new Customer({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state
    })
    customer.save()
        .then(doc => {
            res.status(201).json({
                message: "Created customer successfully",
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.put("/customer/update/:id", (req, res, next) => {
    req.body.$inc = { __v: 1 };

    Customer.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, new: true })
        .then(doc => {
            res.status(200).json({
                message: 'Customer updated'
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.delete("/customer/delete/:id", (req, res, next) => {
    Customer.findOneAndRemove({ _id: req.params.id })
        .then(doc => {
            res.status(200).json({
                message: 'Customer deleted'
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router