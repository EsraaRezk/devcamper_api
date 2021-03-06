const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const  mongoSanitize = require('express-mongo-sanitize');

const app = express();

//Load environemnt variables:
dotenv.config({path: './config/config.env'});

//connect to databasee
connectDB();

//Load route file
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

//Body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

// dev logging middleware -> use only when in development
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//file uploading
app.use(fileupload());

//sanitize data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

//prevent cross site scripting attacks
app.use(xss());

//rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 mins
    max: 100
});
app.use(limiter);

//prevent http param pollution
app.use(hpp());

//enable cors 
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

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