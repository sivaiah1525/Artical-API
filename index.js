const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;
const modeRouter = require("./routes/mode_routes");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(modeRouter);

async function connectToDB() {
    try {
        const URL = 'mongodb://localhost:27017/myproject';
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Succefully Connected To DB');
    } catch (error) {
        console.error('Database Connection Failed');
    }
}
connectToDB()
app.listen(port, console.log(`app is running @ port number ${port}`))