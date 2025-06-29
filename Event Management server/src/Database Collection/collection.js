const { default: mongoose } = require("mongoose");
const eventSchema = require("../Schema/eventSchema");

const eventCollection = new mongoose.model('event', eventSchema);


module.exports = { eventCollection }