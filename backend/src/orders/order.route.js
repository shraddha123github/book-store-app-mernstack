const { createAOrder, getOrderByEmail } = require('./order.controller');
express=require('express');

const router = express.Router();

//create order endpt
router.post("/", createAOrder)

// get order by email
router.get("/email/:email", getOrderByEmail);

  module.exports = router;