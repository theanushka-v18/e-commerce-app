// imported mongoose to establish connection 
const mongoose = require('mongoose');
require('dotenv').config();

// defined mongoDB connection URL
const mongoURL = process.env.MONGO_URL;

// setup mongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

// mongoose maintain a default connection object which maintains mongoDB connection
const db = mongoose.connection;

// defined event listeners for database connection
db.on('connected', () => {
    console.log('connected to mongoDB server');
})

db.on('error', (error) => {
    console.log('mongoDB connection error = ', error);
})

db.on('disconnected', () => {
    console.log('mongoDB disconnected');
})

// finally export db
module.exports = db;