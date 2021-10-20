const express = require('express');
const dotenv = require('dotenv');

//Load environemnt variables:
dotenv.config({path: './config/config.env'});

const app = express();
PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV}, on port ${process.env.PORT}`)
    );

