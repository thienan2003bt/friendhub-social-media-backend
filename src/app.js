const express = require('express');
const app = express();

const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');
const CookieParser = require('cookie-parser');

require('dotenv').config();

// app using packages and middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())

app.use(CookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// DB Connection
require('./db/mongodb.init');

//init routing
app.get('/', (req, res, next) => {
    return res.send("Hello world!");
})

const CORS = require('cors');
app.use(CORS({ origin: true, credentials: true }));
app.use('/api/v1', require('./routes/index'));


//handle errors
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    const statusCode = error?.status ?? 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message ?? 'Internal Server Error',
        errorStack: error?.stack, //Dev mode only
    })
})

module.exports = app;