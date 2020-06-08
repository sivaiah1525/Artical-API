const mongoose = require("mongoose");
const schema = mongoose.Schema;

const articleSchema = new schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("article", articleSchema);