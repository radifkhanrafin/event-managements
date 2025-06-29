 


const getAllUser = async (req, res) => {
    try {
        // ✅ Fake user data array
        const allUsers = [
            {
                _id: "1",
                name: "Alice",
                email: "alice@example.com",
            },
            {
                _id: "2",
                name: "Bob",
                email: "bob@example.com",
            },
            {
                _id: "3",
                name: "Charlie",
                email: "charlie@example.com",
            },
        ];

        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { getAllUser }