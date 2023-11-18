const express = require("express") ;
const app = express();
require('dotenv').config();


const ingestLogs = require("./routes/ingestLogs");

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());



app.use('/', ingestLogs);






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})