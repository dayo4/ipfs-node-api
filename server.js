// import { app } from './add-ons/index.js'
const { app } = require('./add-ons')


//Import Endpoints
// import './routes/index.js'
require('./routes')

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Fulazo-Node-Dev listening on http://${process.env.HOST}:${process.env.PORT}`)
})