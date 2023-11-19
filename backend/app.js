const express = require("express") ;
const app = express();
const cors = require("cors");

const ingestLogs = require("./routes/ingestLogs");
const queryLogs = require("./routes/queryLogs");

const PORT = process.env.PORT || 3000;

app.use(express.json());
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