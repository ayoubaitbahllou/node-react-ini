const express = require('express')
var bodyParser = require('body-parser')
const logger = require('morgan')
require('dotenv').config();
const db = require('./config/dbconnect')
const path = require('path')

var app = express();
app.use(logger())
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}
app.use(bodyParser.json());

/* >> CONNECT TO DB */
db.authenticate()
.then(() => {
    console.log('Connected to DB!')
    db.query("CREATE DATABASE IF NOT EXISTS my_database;");
})
.catch(error => console.error('Impossible to connect with DB :', error))

/* >> ROUTES */
app.get('/', (req, res) => res.send('INDEX') ) 
// app.use("/api/user", require('./routes/User'))

/* >> HANDLE ERROR */
// 

/* >> ROOT DIRECTOR OF STATIC ASSET */
app.use(express.static(path.join(__dirname, 'public')))

app.listen(process.env.SERVER_PORT || 8080)