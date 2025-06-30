console.clear();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./route/userRoute");
const eventRoute = require("./route/eventRoute");
const connectMongoDB = require("./mongoConfig/connectDB");
const jwt = require('jsonwebtoken');
const verifyToken = require("./tokenVerify");
const serverApp = express();


// serverApplication level middleware 
serverApp.use(morgan("dev"));
serverApp.use(express.json());
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: true }));


serverApp.use(cors({
    origin: 'http://localhost:5173',  // your frontend URL
    credentials: true,                // enable sending cookies/credentials
}));




// Root Route

connectMongoDB()
serverApp.get("/", (req, res) =>
    res.status(200).send(`Hello. <br/> Event management Database Running`)
);

serverApp.use('/api/users', userRoute)
serverApp.use('/api/event', eventRoute)

// server error handling -> all the errors
serverApp.use((err, req, res, next) => {
    console.log(err);
    res.status(400).send(err);

    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
        error: err,
    });
});


module.exports = serverApp;