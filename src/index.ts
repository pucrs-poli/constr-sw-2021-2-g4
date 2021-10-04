// import "reflect-metadata";

// import connectDatabase from "./database";
import server from "./server";
server.init();

// connectDatabase()
//   .then(() => {
//     console.log("Connected successfully to database.");
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log(`Error connecting to database!\n${err.message}`);
//   });