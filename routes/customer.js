const express = require("express");
const customer_model = require("../Modals/costomer_modal")
const router = express.Router();

router.post("/user", (req, res)=> {
    customer_model.find({email: req.body.email}).then((data)=>{
        if(data.length){
            res.send("User already existed")
        } else{
            customer_model.create({
                name: req.body.name,
                email: req.body.email
        }).then((data)=> {
                res.status(200).send("Customer Added sucessfully")
            }).catch((err)=> {
                res.status(400).send(err)
            })
        }
    })
});

router.get("/showUser", (req, res)=>{
    customer_model.find().then((data)=>{
        res.status(200).send({data: data});
    })
})
module.exports = router;