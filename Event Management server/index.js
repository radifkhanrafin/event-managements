<<<<<<< HEAD
 
const connectMongoDB = require("./src/mongoConfig/connectDB");
const { PORT } = require("./src/secretFile/secret");
const serverApp = require("./src/serverApp");

connectMongoDB();
=======

const connectMongoDb = require("./src/mongoConfig/connectDB");
const { PORT } = require("./src/secretFile/secret");
const serverApp = require("./src/serverApp");

// connectMongoDb()
>>>>>>> 7ee6c28f036ea238c7c934d0d6e860f946dce243
// Running Server
try {

  serverApp.listen(PORT, async () => {
    console.log(`Event Management Server Running - http://localhost:${PORT}`);
  });

} catch (error) {
  console.log(error.message)
}




