const express = require("express");
const {
  getAllEvent,
  postEvent,
  updateEventAttendees,
  postManyEvent,
  getEventByUser,
  getEventByIdAndDelete,
  getEvent,
  updateEvent
} = require("../controllers/eventController");
const verifyToken = require("../tokenVerify");


const eventRoute = express.Router();

//  Public routes
eventRoute.get('/', getAllEvent);
eventRoute.get('/:id', getEvent);

//  Protected routes
eventRoute.post('/', verifyToken, postEvent);
eventRoute.post('/many', verifyToken, postManyEvent);
eventRoute.patch('/:id', verifyToken, updateEvent);
eventRoute.patch('/:eventId', verifyToken, updateEventAttendees);
eventRoute.delete('/:eventId', verifyToken, getEventByIdAndDelete);
eventRoute.get('/user/:id', verifyToken, getEventByUser);

module.exports = eventRoute;
