const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongo = require("mongoose");

const authRout = require('./routes/auth');

mongo
.connect(process.env.mongoURL)
.then(() => console.log("Database connected"))
.catch((err) => console.error(err));

app.use('/api/auth',authRout);


app.listen(process.env.port, () => {
    console.log("Server running");
});