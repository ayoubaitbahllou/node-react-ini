const express = require('express')
var bodyParser = require('body-parser')
const logger = require('morgan')
const errorHandler = require('./middlewares/error');
const ErrorResponse = require('./utils/errorResponse');

var app = express()

// Logger of http requests
if(process.env.NODE_ENV !== "development") {
	app.use(logger("dev"))
}
app.use(bodyParser.json())

// parse requests of (content-type - application/json) And add body attribute to req to handle Post-Put-Patch requests
app.use(express.json())

// ROUTES 
app.get('/', (req, res) => res.send('INDEX')) 
app.use("/api/user", require('./routes/User'))

// ROOT DIRECTOR OF STATIC ASSET 
app.use(express.static('/public'))

// Handle Non exciting route
app.all("*", (req, res, next) => {
    next(new ErrorResponse("Path Not Fount", 404))
})

// HANDLE Global Errors
app.use(errorHandler)

module.exports = app