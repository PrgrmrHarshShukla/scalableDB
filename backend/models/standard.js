const mongoose = require("mongoose");

const standardLogSchema = new mongoose.Schema({
    level: String,
    message: String,
    timestamp: Date,
    resourceId: String,
    traceId: String,
    spanId: String,
    commit: String,
    metadata: {
        parentResourceId: String,
    }
});
module.exports = mongoose.model("StandardLog", standardLogSchema);
  