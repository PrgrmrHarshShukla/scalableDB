const express = require("express") ;
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();


const ingestLogs = require("./routes/ingestLogs");
const queryLogs = require("./routes/queryLogs");

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.MONGODB_URI;

mongoose.connect(DATABASE_URL,  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error("####  Database connection error  ####\n", error));
db.once('open', () => console.log('Atlas connected.'))



app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))


app.use('/', ingestLogs);
app.use('/filters', queryLogs);






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})