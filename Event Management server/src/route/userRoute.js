const express = require("express");
const { postUser, loginUser } = require("../controllers/userControllers");
const userRoute = express.Router();

userRoute.post('/register', postUser)
userRoute.post('/login', loginUser)

module.exports = userRoute;