// Initialize App with primary plugins
const express = require('express')
const cors = require('cors')
// const helmet = require("helmet")
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended : true,limit:'20000000kb'}))
app.use(bodyParser.json({limit:'20000000kb'}))
app.use(cors(/* {
    origin:
    process.env.NODE_ENV === "development"
    ? ["http://localhost:3000", "https://node.fulaso.io"]
    : "",
} */))
app.use(express.static('public'))
// app.use(helmet())


//Import Internal Plugins


// Add other plugins


module.exports = {
    app
}