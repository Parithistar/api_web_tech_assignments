const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    inventory_id:String,
    item_name: String,
    inventory_type: String,
    available_quantity: Number
});

const inventory_model = mongoose.model("items", inventorySchema);

module.exports = inventory_model;