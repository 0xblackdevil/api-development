const express = require("express");
const dotenv = require("dotenv");
const mongo = require("mongoose");
const authRout = require('./routes/auth');
dotenv.config();

const app = express();
app.use(express.json());

//mongo database connection...
mongo
.connect(process.env.mongoURL)
.then(() => console.log("Database connected"))
.catch((err) => console.error(err));

//routes
app.use('/api/auth',authRout);

//server listen
app.listen(process.env.port, () => {
    console.log("Server running");
});