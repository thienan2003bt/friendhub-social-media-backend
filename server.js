const app = require("./src/app");
require('dotenv').config();

const PORT = process.env.PORT || 8081;

const server = app.listen(PORT, () => {
    console.log("FriendHub NodeJS Core Server is listening on port " + PORT + ", url: http://localhost:" + PORT);
})

process.on('SIGINT', () => {
    server.close(() => console.log("! Exit Server Express !"))
    // TODO: Disconnect from Database if needed
    process.exit(0);
})