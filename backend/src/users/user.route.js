const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY


router.post("/admin", async (req , res)=> {
    const {username, password} = req.body;
    try {
        const admin = await User.findOne({username});
        if(!admin){
            res.status(404).send({message: "Admin Not found"})
        }

        if(admin.password!== password){
            res.status(404).send({message: "Invalid password"})
        }

        // const isMatch = await bcrypt.compare(password, admin.password);
        // if(!isMatch){
        //     return res.status(401).send({message: "Invalid password"});
        // }

        const token = jwt.sign(
            {id:admin._id, username:admin.username, role:admin.role},
            JWT_SECRET,
            {expiresIn:"1h"}

        )

        return res.status(200).json({
            message: "Authentication Successfull",
            token : token,
            user: {
                username : admin.username,
                role: admin.role
            }
        })

    } catch (error) {
        console.log("Failed to Login as Admin")
        res.status(401).send({message: "Inavalid Credentials"})
    }
})

module.exports = router;
