const express = require('express')
var bodyParser = require('body-parser')
const logger = require('morgan')
require('dotenv').config();
const db = require('./src/models')
const errorHandler = require('./src/middlewares/error');
const path = require('path')

var app = express()

/* >> Log */
app.use(logger())
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"))
}
app.use(bodyParser.json())

/* >> parse requests of content-type - application/json */
app.use(express.json())

/* >> HANDLE ERROR */
app.use((err, req, res, next) => {
    console.error('Erreur non gérée :', err)
    res.status(500).send('Erreur interne du serveur')
});
// 

/* >> ROUTES */
app.get('/', (req, res) => res.send('INDEX')) 
app.use("/api/user", require('./src/routes/User'))

app.use(errorHandler)

/* >> ROOT DIRECTOR OF STATIC ASSET */
app.use(express.static(path.join(__dirname, 'public')))

db.sequelize.sync().then(req => {    
    app.listen(process.env.SERVER_PORT || 3001)
})