const { default: mongoose } = require("mongoose");
const eventSchema = require("../Schema/eventSchema"); 
const userSchema = require("../Schema/userSchema");

const eventCollection = mongoose.model('event', eventSchema);
const usersCollection = mongoose.model('users', userSchema);


module.exports = { eventCollection, 
    usersCollection 
}