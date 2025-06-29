console.clear();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const xssClean = require("xss-clean");
const cors = require("cors");
const userRoute = require("./route/userRoute");
const eventRoute = require("./route/eventRoute");
const connectMongoDB = require("./mongoConfig/connectDB");

const serverApp = express();


// serverApplication level middleware
serverApp.use(cors());
serverApp.use(morgan("dev"));
serverApp.use(express.json());
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: true }));


// const verifyToken = (req, res, next) => {
//     const bearer = req.headers['authorization'];
//     if (!bearer) return res.status(403).json({ error: 'No token' });
//     const token = bearer.split(' ')[1];
//     jwt.verify(token, SECRET, (err, decoded) => {
//         if (err) return res.status(403).json({ error: 'Invalid token' });
//         req.userId = decoded.id;
//         next();
//     });
// };
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