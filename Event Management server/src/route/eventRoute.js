const express = require("express");
const {  getAllEvent, postEvent } = require("../controllers/eventController");
const eventRoute = express.Router();

eventRoute.post('/', postEvent)
eventRoute.get('/', getAllEvent)


module.exports = eventRoute;