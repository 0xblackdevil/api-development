const express = require("express");
const dotenv = require("dotenv");
const mongo = require("mongoose");
const authRout = require('./routes/auth');
dotenv.config();

const app = express();
app.use(express.json());

//mongo database connection...
mongo
.connect("mongodb+srv://blackdevil98:soNi1807*@apitest.kshe3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() => console.log("Database connected"))
.catch((err) => console.error(err));

//routes
app.use('/api/auth',authRout);

//server listen
app.listen(process.env.port, () => {
    console.log("Server running");
});