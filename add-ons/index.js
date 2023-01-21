// Initialize App with primary plugins
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
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