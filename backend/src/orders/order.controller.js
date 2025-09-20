const Order = require("./order.model")

const createAOrder=async(req, res)=>
{
try {
    console.log("Incoming order:", req.body);
const newOrder = new Order(req.body);
const savedOrder = await newOrder.save();
res.status(201).json(savedOrder);

} catch (error) {
    console.log("Incoming order:", req.body);
    console.error("Error Creating Order",error);
    res.status(500).json({message : "Failed to create Order"});
}
};

const getOrderByEmail =async(req, res)=>{
    try {
        const {email}=req.params;
        const orders =await Order.find({email}).sort({createdAt: -1});
        if(!orders){
            return res.status(404).json({message: "Order not found"});
        }
        return res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching Order",error);
        res.status(500).json({message : "Failed to fetch Order"});
    }
}

module.exports={
    createAOrder,
    getOrderByEmail
}