const express = require("express");
const order_model = require("../Modals/order_modal");
const inventory_model = require("../Modals/inventory_modal")
const router = express.Router();

router.post("/add", (req, res)=> {
    inventory_model.find({ inventory_id: req.body.inventory_id }).then((data) => {
        if (data.length) {
            const available = data[0].available_quantity
            if (available >= req.body.quantity) {
                order_model.create({
                    customer_id: req.body.customer_id,
                    inventory_id: req.body.inventory_id,
                    item_name: req.body.item_name,
                    quantity: req.body.quantity
                }).then(() => {
                    const setquantity = available-req.body.quantity
                    inventory_model.updateOne({ inventory_id: req.body.inventory_id }, { $set: { available_quantity: setquantity } }).then(() => {
                        res.status(200).send("Order Placed Successfully")
                    }).catch((err) => {
                        res.status(400).send(err.message)
                    })
                }).catch((err) => {
                    res.status(400).send(err.message)
                })
            } else {
                res.status(400).send("Out of order")
            }
        } else {
            res.status(400).send("No such Inventory")
        }
    }).catch((err) => {
        res.status(400).send(err.message)
    })
});

router.get("/showOrder", (req, res)=>{
    order_model.find().then((data)=>{
        res.status(200).send({data: data});
    })
})
module.exports = router;