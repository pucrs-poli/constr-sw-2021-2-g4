// import server from "./server";

// const PORT = process.env.APPLICATION_PORT

// server.listen(PORT, () => {
// })
const appp = require('./server')
const port = process.env.PORT
appp.listen(port, () => { console.log(`listening on ${port}`) })