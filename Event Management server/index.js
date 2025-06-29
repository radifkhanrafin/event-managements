 
// const connectMongoDb = require("./src/mongoConfig/connectDB");
// const { PORT } = require("./src/secretFile/secret");
// const serverApp = require("./src/serverApp");
 
//   // connectMongoDb()
// // Running Server
// try {

//   serverApp.listen(PORT, async () => {
//     console.log(`Event Management Server Running - http://localhost:${PORT}`);
//   });

// } catch (error) {
//   console.log(error.message)
// }


const express = require('express')
const serverApp = require('./src/serverApp')
const app = express()
const port = 3000


 
serverApp.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


