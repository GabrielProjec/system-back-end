require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")


const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(
    cors({
        origin:["http://localhost:3000"],
        credentials: true
    })
)

app.get('/', (req, res) => {
    res.send("Hello Word")
})

const PORT = 5000

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})
.catch((err) => console.log(err))