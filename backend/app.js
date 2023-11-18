const express = require("express") ;
const app = express();

const ingestLogs = require("./routes/ingestLogs");
const queryLogs = require("./routes/queryLogs");

const PORT = process.env.PORT || 3000;

app.use(express.json());



app.use('/', ingestLogs);
app.use('/filters', queryLogs);






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})