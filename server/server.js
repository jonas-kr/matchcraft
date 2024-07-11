const express = require('express')
const mongoose = require('mongoose')
const port = 5400
const app = express()
const cors = require('cors')
const UsersRoute = require('./routes/UserRoute')
const AdminRoute = require('./routes/AdminRoute')
require('dotenv').config()


app.use(express.json())
app.use(cors())

app.use('/users', UsersRoute)
app.use('/admin', AdminRoute)



mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(port, () => {
            console.log("server is running on port", port)
        })
        console.log('Connected to DB')
    })

