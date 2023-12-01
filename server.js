require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")


const app = express()

app.get('/', (req, res) => {
    res.send("Home Page")
})

const PORT = 5000

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})
.catch((err) => console.log(err))