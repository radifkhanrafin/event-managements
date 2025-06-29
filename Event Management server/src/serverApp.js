console.clear();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const xssClean = require("xss-clean");
const cors = require("cors");
const userRoute = require("./route/userRoute");

const serverApp = express();


// serverApplication level middleware
serverApp.use(cors());
serverApp.use(morgan("dev")); 
serverApp.use(express.json());
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: true }));

// Root Route
serverApp.get("/", (req, res) =>
    res.status(200).send(`Hello. <br/> Event management Database Running`)
);

serverApp.use('/users',userRoute) 

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