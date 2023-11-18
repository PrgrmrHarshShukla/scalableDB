const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const StandardLog = require("../models/standard");

require('dotenv').config();


const MONGODB_URI = process.env.MONGODB_URI;

router.post('/ingest', async (req, res) => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB connected.")
        
        const logs = await req.body;
        const bulkOps = logs.map(log => ({
            insertOne: {
                document: log
            }
        }))
        const timeData = await logs[0].timestamp.slice(0, 7);
        const collectionName = `logs_${timeData}`;
        const collectionExists = await mongoose.connection.db.listCollections({ name: collectionName }).hasNext();

        if(!collectionExists){
            try {
                await mongoose.connection.db.createCollection(collectionName);
            } 
            catch (error) {
                console.error("Error creating collection:", error);
                return res.status(500).json({
                    msg: "Error creating collection",
                });
            }
        }

        const StandardLogModel = mongoose.model(collectionName, StandardLog);
        const result = await StandardLogModel.bulkWrite(bulkOps);
        res.status(200).json({
            msg: "Log saved successfully",
            logs
        })
    } 
    catch (error) {
        res.status(500).json({
            msg: "Some unexpected error occured."
        })
    }
    finally {
        await mongoose.disconnect();
    }
})








module.exports = router;