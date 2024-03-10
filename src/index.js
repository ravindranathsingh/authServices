const express = require('express')
const bodyparser = require('body-parser')
const {PORT} = require('./config/server-config')
const app = express();

const apiRoutes = require('./routes/index')
const db = require('./models/index')

const serverSetUp = () => {

    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({extended: true}))

    app.use('/api', apiRoutes)

    app.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`)
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true})
        }
    })
}

serverSetUp();