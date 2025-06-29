const mongoose = require('mongoose'); 
const { mongodbURL } = require('../secretFile/secret');

<<<<<<< HEAD
const connectMongoDB = async () => {
=======
const connectMongoDb = async () => {
>>>>>>> 7ee6c28f036ea238c7c934d0d6e860f946dce243
   mongoose.set('strictQuery', false);
   try {
      await mongoose
         .connect(mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "event_management",
         })
         .then(() => console.log("Database connection successful"))
         .catch((err) => console.log(err));
   } catch (error) {
      console.error('Could not connect to DataBase: ', error.toString());
   }
}

<<<<<<< HEAD
module.exports = connectMongoDB ;
=======
module.exports = connectMongoDb ;
>>>>>>> 7ee6c28f036ea238c7c934d0d6e860f946dce243
