const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const StandardLog = require("../models/standard");

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;


router.get('/compound_queries', async (req, res) => {
    try {
        const { level, resourceId, message, traceId, spanId, commit, parentResourceId } = req.query;

        await mongoose.connect(MONGODB_URI);
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map(coll => coll.name);

        const matchStages = [];
        if (level) matchStages.push({ level });
        if (message) matchStages.push({ message: { $regex: message, $options: 'i' } });
        if (resourceId) matchStages.push({ resourceId });
        if (traceId) matchStages.push({ traceId });
        if (spanId) matchStages.push({ spanId });
        if (commit) matchStages.push({ commit });
        if (parentResourceId) {
            matchStages.push({ 'metadata.parentResourceId': parentResourceId });
        }

        const collectionPromises = collectionNames.map(async (collectionName) => {
            const result = await mongoose.connection.db.collection(collectionName).find({
                $and: matchStages,
            }).toArray();
        
            return result;
        });
        
        const results = await Promise.all(collectionPromises);
        const mergedResult = [].concat(...results);

        res.status(200).json(mergedResult);
    } 
    catch (error) {
        console.log("Error:\n", error);
        res.status(500).json({
            msg: "Some unexpected error occured while fetching logs.",
            error
        })        
    }
    finally {
        await mongoose.disconnect();
    }
})


router.get('/timestamp_based', async(req, res) => {
    try {
        const { startTime, endTime } = req.query;

        const timeData1 = startTime.slice(0, 7);
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        await mongoose.connect(MONGODB_URI);
        const collections = await mongoose.connection.db.listCollections().toArray();        
        const collectionNames = collections.map(collection => collection.name);

        const filteredCollection = collectionNames.filter(name => (name === `logs_${timeData1}`));

        if(filteredCollection.length > 0){
            const result = await mongoose.connection.db.collection(filteredCollection[0]).find({
                timestamp: { $gte: startDate, $lte: endDate },
            }).toArray();

    
            res.status(200).json(result);
        }
        else{
            res.status(404).json({
                msg: "No such logs found"
            });
        }

    } 
    catch (error) {
        console.log("Error:\n", error);
        res.status(500).json({
            msg: "Some unexpected error occured.",
            error
        })
    }
    finally {
        await mongoose.disconnect();
    }    
})


router.get('/full_text_search', async (req, res) => {
    try {
        const searchText = req.query.q;
        await mongoose.connect(MONGODB_URI);
        const collections = await mongoose.connection.db.listCollections().toArray(); 
        let allResults = [];

        for(const collectionInfo of collections){
            const collectionName = collectionInfo.name;
            const result = await db.collection(collectionName).find({ $text: { $search: searchText } }).toArray();
            allResults = allResults.concat(result);
        }
        res.status(200).json(allResults);

    } catch (error) {
        res.status(500).json({
            msg: "Some unexpected error occured.",
            error
        })
    }
    finally {
        await mongoose.disconnect();
    }    
})








module.exports = router