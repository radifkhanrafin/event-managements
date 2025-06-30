const express = require("express");
const {  getAllEvent, postEvent, updateEventAttendees, postManyEvent, getEventById, getEventByUser, getEventByIdAndDelete, getEvent, updateEvent } = require("../controllers/eventController");
const eventRoute = express.Router();

eventRoute.post('/', postEvent)
eventRoute.post('/many', postManyEvent)
eventRoute.get('/', getAllEvent)
eventRoute.get('/:id', getEvent)
eventRoute.patch('/:id', updateEvent)
eventRoute.get('/user/:id', getEventByUser)
eventRoute.patch('/:eventId', updateEventAttendees)
eventRoute.delete('/:eventId', getEventByIdAndDelete)


module.exports = eventRoute;