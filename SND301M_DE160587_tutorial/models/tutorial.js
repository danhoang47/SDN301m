const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const detailSchema = new Schema({
    Publisher: {
        type: String,
        required: true,
    },
    Publication_Year: {
        type: Number,
        required: true
    },
    "ISBN-13": {
        type: Number,
        required: true,   
    },
    Language: {
        type: String,
        required: true
    },
    Pages: {
        type: Number,
        required: true
    }
})

const priceSchema = new Schema({
    "type": {
        type: String,
        required: true
    },
    price: Currency
})

const tutorialSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Genre: {
        type: String,
        required: true
    },
    Detail: {
        type: detailSchema,
        required: true
    },
    Price: {
        type: [priceSchema],
        required: true
    }
}, {
    timestamp: true
})

const model = mongoose.model("tutorial", tutorialSchema);
module.exports = model;