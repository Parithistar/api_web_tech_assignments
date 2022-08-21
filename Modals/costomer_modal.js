const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: String,
    email: String
});

const customer_model = mongoose.model("customer", customerSchema);

module.exports = customer_model;