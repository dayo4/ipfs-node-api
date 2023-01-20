// Initialize App with primary plugins
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors(/* {
    origin:
    process.env.NODE_ENV === "development"
    ? ["http://localhost:3000", "https://node.fulaso.io"]
    : "",
} */))
app.use(express.static('public'))

//Import Internal Plugins


// Add other plugins


module.exports = {
    app
}