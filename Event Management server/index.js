 
const connectMongoDB = require("./src/mongoConfig/connectDB");
const { PORT } = require("./src/secretFile/secret");
const serverApp = require("./src/serverApp");
 
// Running Server
try {

  serverApp.listen(PORT, async () => {
    console.log(`Event Management Server Running - http://localhost:${PORT}`);
  });

} catch (error) {
  console.log(error.message)
}




