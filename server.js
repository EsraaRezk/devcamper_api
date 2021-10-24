const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');

const app = express();
//Load environemnt variables:
dotenv.config({path: './config/config.env'});

//connect to databasee
connectDB();

//Load route file
const bootcamps = require('./routes/bootcamps');

//Body parser
app.use(express.json());

// dev logging middleware -> use only when in development
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

//Load error handler:
app.use(errorHandler);

PORT = process.env.PRT || 5000;
const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV}, on port ${process.env.PORT}`.yellow.bold)
    );

// Handle unhandled promise rejections:
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    // Close server and exit process
    server.close(() => process.exit(1));
});