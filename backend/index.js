const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors");

require('dotenv').config()

//middlewear
app.use(express.json());
app.use(cors({
    origin:['http://localhost:5173'],
    credentials: true,
}))

const mongoose = require('mongoose');
//04d6el7iZAFIMeBY
//UtcoK0KnpjKZ5Axp

const bookRoutes = require('./src/books/book.route')

const orderRoutes= require('./src/orders/order.route')
const userRoutes =require('./src/users/user.route');
//const { default: AdminRoute } = require('../frontend/src/routers/AdminRoute');
const adminRoutes= require("./src/stats/admin.state")

app.use("/api/books",bookRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.get('/', (req, res) => {
        res.send('Book Store Application')
    })
}
main().then(()=> console.log("Mongodb Connect Successfully!")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
