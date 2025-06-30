const { eventCollection } = require("../Database Collection/collection");

const postEvent = async (req, res) => {
    const newData = req.body;
    console.log("BODY:", newData);
    console.log("req.userId:", req.userId);

    try {
        newData.createdBy = req.userId;
        const insertPost = await eventCollection(newData).save();
        res.status(200).json(insertPost);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
};

const postManyEvent = async (req, res) => {
    const newData = req.body;
    try {
        // Add createdBy for each event
        const eventsWithCreator = newData.map(event => ({
            ...event,
            createdBy: req.userId
        }));

        const insertPost = await eventCollection.insertMany(eventsWithCreator);
        res.status(200).json(insertPost);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
};

const getAllEvent = async (req, res) => {
    try {
        const allEvent = await eventCollection.find();
        res.status(200).send(allEvent);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

const getEvent = async (req, res) => {
    const id = req.params.id;
    try {
        const event = await eventCollection.findById(id);
        res.status(200).send(event);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

const getEventByUser = async (req, res) => {
    const requestedUserId = req.params.id;

    // if (requestedUserId !== req.userId) {
    //     return res.status(403).json({ message: "Unauthorized" });
    // }

    try {
        const events = await eventCollection.find({ createdBy: requestedUserId });
        res.status(200).send(events);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

const updateEvent = async (req, res) => {
    const eventId = req.params.id;
    const updateData = req.body;

    try {
        const existingEvent = await eventCollection.findById(eventId);

        if (!existingEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        if (existingEvent.createdBy.toString() !== req.userId) {
            return res.status(403).json({ error: "Not allowed to update this event" });
        }

        const updatedEvent = await eventCollection.findByIdAndUpdate(
            eventId,
            updateData,
            { new: true }
        );

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Failed to update event" });
    }
};

const updateEventAttendees = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const event = await eventCollection.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        const alreadyJoined = event.joinedUsers.includes(userId);

        if (!alreadyJoined) {
            event.joinedUsers.push(userId);
            event.attendeeCount += 1;
            await event.save();
        }

        res.status(200).json({
            message: alreadyJoined ? "User already joined." : "User joined successfully.",
            event,
        });
    } catch (error) {
        console.error("Join event error:", error);
        res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
};

const getEventByIdAndDelete = async (req, res) => {
    const id = req.params.eventId;

    try {
        const existingEvent = await eventCollection.findById(id);

        if (!existingEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        if (existingEvent.createdBy.toString() !== req.userId) {
            return res.status(403).json({ error: "Not allowed to delete this event" });
        }

        const deletedEvent = await eventCollection.findByIdAndDelete(id);
        res.status(200).send(deletedEvent);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

module.exports = {
    postEvent,
    postManyEvent,
    getAllEvent,
    getEvent,
    getEventByUser,
    updateEvent,
    updateEventAttendees,
    getEventByIdAndDelete,
};
