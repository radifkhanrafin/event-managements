const { eventCollection } = require("../Database Collection/collection");



// post a event  

const postEvent = async (req, res) => {
    const newData = req.body;
    console.log(newData)
    try {
        const insertPost = await eventCollection(newData).save();
        res.status(200).json(insertPost)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message });
    }
}
// post many event  

const postManyEvent = async (req, res) => {
    const newData = req.body;
    // console.log(newData)
    try {
        const insertPost = await eventCollection.insertMany(newData);
        res.status(200).json(insertPost)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message });
    }
}

const updateEventAttendees = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        // Find the event
        const event = await eventCollection.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        // Check if the user already joined
        const alreadyJoined = event.joinedUsers.includes(userId);

        if (!alreadyJoined) {
            // Add user ID to joinedUsers and increment attendeeCount
            event.joinedUsers.push(userId);
            event.attendeeCount += 1;
            await event.save();
        }

        res.status(200).json({
            message: alreadyJoined ? 'User already joined.' : 'User joined successfully.',
            event,
        });
    } catch (error) {
        console.error('Join event error:', error);
        res.status(500).json({ message: 'Something went wrong.', error: error.message });
    }
}


const getAllEvent = async (req, res) => {
    try {
        const allEvent = await eventCollection.find();
        res.status(200).send(allEvent);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};
const getEvent = async (req, res) => {
    const id=req.params.id
    console.log(req.body)
    try {
        const allEvent = await eventCollection.findById(id);
        res.status(200).send(allEvent);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

const getEventByIdAndDelete= async (req, res) => {
    const id=req.params.eventId
    try {
        const Event = await eventCollection.findByIdAndDelete(id);
        res.status(200).send(Event);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

const getEventByUser= async (req, res) => {
    const id=req.params.id
    try {
        const Event = await eventCollection.find({createdBy:id});
        res.status(200).send(Event);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};


// update event body 

// post a event  

// ✅ PATCH /event/:id
const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const updateData = req.body;

  try {
    const updatedEvent = await eventCollection.findByIdAndUpdate(
      eventId,
      updateData,
      { new: true } // returns updated doc
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update event" });
  }
};


module.exports = { postEvent,getEvent, getAllEvent, updateEventAttendees,postManyEvent,getEventByUser,getEventByIdAndDelete ,updateEvent}
