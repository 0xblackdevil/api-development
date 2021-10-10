const router = require('express').Router();
const User = require('../modules/userModule');
var CryptoJS = require("crypto-js");

router.get("/",async(req,res)=>{
    res.json({
        "message": "Welcome to blackdevil auth api"
    });
})

router.post("/registration",async(req,res)=>{
    const otp = Math.floor(100000 + Math.random() * 900000);
    const newUser = new User({
        uName :req.body.uName,
        uAddress :req.body.uAddress,
        uEmail :req.body.uEmail,
        uPassword : CryptoJS.AES.encrypt(req.body.uPassword, process.env.passKey).toString(),
        uNumber :req.body.uNumber,
        uOTP : otp,
    })
    try {
        const userData = await newUser.save();
        res.json({
            "status": 201,
            "message":"user registrated",
            "data":{
                "uId":userData._id.toString(),
                "name":userData.uName,
                "address":userData.uAddress,
                "email":userData.uEmail,
                "phone":userData.uNumber,
                "otp":userData.uOTP,
            }
        });
    } catch (err) {
        console.error(err);
        res.json({
            "status": 500,
            "message":"error occur",
            "error": err.message
        })
    }
});

router.post("/login",async(req,res)=>{
    try {

        const user = User.find({ uEmail: req.body.uEmail });
        !user && res.status(500).json({
            "status":500,
            "message" : "user not found"
        });

        // const orgPassword = CryptoJS.AES.decrypt(user.uPassword, process.env.passKey);
        // const pwd = orgPassword.toString();

        console.log("Password : ",user);
        
        // pwd !== req.body.uPassword && 
        // res.status(500).json({
        //     "status":500,
        //     "message" : "password wrong"
        // });

        // res.status(200).json({
        //     "status":200,
        //     "data":user
        // })
        
    } catch (err) {
        console.error(err);
        res.json({
            "status": 500,
            "message":"error occur",
            "error": err.message
        })
    }
});

router.get("/info/:id", async(req,res)=>{
    const { id } = req.params;
    try {
        
    } catch (err) {
        console.error(err.message);
    }

})

module.exports = router;