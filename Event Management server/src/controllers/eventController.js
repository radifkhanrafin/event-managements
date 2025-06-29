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


// const postEvent = async (req, res) => {
//     try {
//         const { title, name, date, location, description } = req.body;

//         console.log(req.body)
//         if (!title || !name || !date || !location || !description) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         // Create new event
//         const newEvent = new Event({
//             title,
//             name,
//             date,
//             location,
//             description,
//             attendeeCount: 0,
//             createdBy: req.userId,
//             joinedUsers: [],
//         });

//         const savedEvent = await eventCollection(newEvent).save();

//         res.status(201).json(savedEvent);
//     } catch (error) {
//         console.error('Error posting event:', error);
//         res.status(500).json({ error: 'Server error while posting event' } );
//     }
// };
// Get all event
const getAllEvent = async (req, res) => {
    try {
        const allEvent = await eventCollection.find();
        res.status(200).send(allEvent);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};


module.exports = { postEvent, getAllEvent }