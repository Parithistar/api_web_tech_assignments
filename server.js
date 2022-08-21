const express = require("express");
const server = express();
const mongoose = require("mongoose")

const inventoryControl = require("./routes/inventory")
const customerControl = require("./routes/customer")
const orderControl = require("./routes/order")

server.use(express.json());
server.use(express.urlencoded({extended: false}));


server.listen(process.env.PORT || 3001, (req, res) => {
    console.log(`server started at 3001`);
});

mongoose.connect("mongodb://localhost/api_web_tech_assignmnet", (data)=>{
    console.log("DB is connected succesfully")
}, (err)=>{
    console.log(err);
})

server.get("/", (req, res)=>{
    res.send("Api-web-tech-assignment-works")
})

server.use("/inventory", inventoryControl)
server.use("/customer", customerControl)
server.use("/order", orderControl)