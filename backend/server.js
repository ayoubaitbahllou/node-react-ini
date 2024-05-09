require('dotenv').config();

const app = require('./index')
const db = require('./models')

db.sequelize.sync().then(() => {    
    app.listen(process.env.SERVER_PORT || 3001)
})