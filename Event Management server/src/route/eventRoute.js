const express = require("express");
const {  getAllEvent, postEvent, updateEventAttendees, postManyEvent, getEventById } = require("../controllers/eventController");
const eventRoute = express.Router();

eventRoute.post('/', postEvent)
eventRoute.post('/many', postManyEvent)
eventRoute.get('/', getAllEvent)
eventRoute.get('/:id', getEventById)
eventRoute.patch('/:eventId', updateEventAttendees)


module.exports = eventRoute;