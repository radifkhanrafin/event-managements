const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    name: String,
    date: Date,
    time: String,
    location: String,
    description: String,
    attendeeCount: { type: Number, default: 0 },
    createdBy: String,
    joinedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = eventSchema;
 