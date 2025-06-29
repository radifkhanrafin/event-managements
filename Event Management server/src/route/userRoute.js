const express = require("express"); 
const { getAllUser } = require("../controllers/userControllers");
const userRoute = express.Router();

// userRoute.post('/', postUser)
userRoute.get('/', getAllUser)
// userRoute.get('/email/:email', getUserByEmail)
// userRoute.get('/id/:id', getUserById)

module.exports = userRoute;