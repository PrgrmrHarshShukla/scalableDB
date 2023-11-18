const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const StandardLog = require("../models/standard");

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;


router.get('/compound_queries', async (req, res) => {
    try {
        const { level, resourceId, message, traceId, spanId, commit, parentResourceId } = req.query;

        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const collectionNames = await mongoose.connection.db.listCollections().toArray();
        const aggregationStages = collectionNames.map(collection => ({
            $unionWith: {
                coll: collection.name,
            },
        }))

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
        if (matchStages.length > 0) {
            aggregationStages.push({
              $match: {
                $or: matchStages,
              },
            });
        }

        const result = await db.aggregate(aggregationStages).toArray();
        res.status(200).json(result);
    } 
    catch (error) {
        res.status(500).json({
            msg: "Some unexpected error occured.",
            error
        })        
    }
    finally {
        await mongoose.disconnect();
    }
})


router.get('/timestamp_based', async(req, res) => {
    try {
        

        




    } catch (error) {
        res.status(500).json({
            msg: "Some unexpected error occured.",
            error
        })
    }
})









module.exports = router