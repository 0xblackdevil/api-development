const router = require("express").Router();
const User = require("../modules/userModule");
var CryptoJS = require("crypto-js");

router.get("/", async (req, res) => {
  res.json({
    message: "Welcome to blackdevil auth api",
    routes: {
      "/registration": "new user registration",
      "/login": "user login",
      "/info/:id": "get user data",
    },
  });
});

router.post("/registration", async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const newUser = new User({
    uName: req.body.uName,
    uAddress: req.body.uAddress,
    uEmail: req.body.uEmail,
    uPassword: req.body.uPassword,
    uNumber: req.body.uNumber,
    uOTP: otp,
  });
  try {
    const userData = await newUser.save();
    res.json({
      status: 201,
      message: "user registrated",
      data: {
        uId: userData._id.toString(),
        name: userData.uName,
        address: userData.uAddress,
        email: userData.uEmail,
        phone: userData.uNumber,
        otp: userData.uOTP,
      },
    });
  } catch (err) {
    console.error(err);
    res.json({
      status: 500,
      message: "eror occrur",
      error: "User already registrated",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ uEmail: req.body.uEmail });
    if (!user) {
      res.status(404).json({ status: 404, message: "user not found" });
    } else if (user.uPassword !== req.body.uPassword) {
      res.status(401).json({ status: 401, message: "password wrong" });
    } else {
      res.status(200).json({
        status: 200,
        message: "user loged in",
        data: {
          uId: user._id.toString(),
          name: user.uName,
          email: user.uEmail,
          number: user.uNumber,
          address: user.uAddress,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
});

router.get("/info/:id", async (req, res) => {
  try {
    const uId = req.params.id;
    const user = await User.findOne({ _id: uId });
    if (!user) {
      res.status(404).json({ status: 404, message: "user not found" });
    } else {
      res.status(200).json({
        status: 200,
        message: "user's details",
        data: {
          uId: user._id.toString(),
          name: user.uName,
          email: user.uEmail,
          number: user.uNumber,
          address: user.uAddress,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
});

module.exports = router;
