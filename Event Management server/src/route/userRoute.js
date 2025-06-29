const express = require("express"); 
const {   postUser, loginUser } = require("../controllers/userControllers");
const userRoute = express.Router();

userRoute.post('/register', postUser)
userRoute.post('/login', loginUser)
// userRoute.get('/', getAllUser)
// userRoute.get('/email/:email', getUserByEmail)
// userRoute.get('/id/:id', getUserById)

module.exports = userRoute;