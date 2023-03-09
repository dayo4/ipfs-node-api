const { app } = require('./add-ons')


//Import Endpoints
require('./routes')

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Fulazo-Node-Dev listening on http://${process.env.HOST}:${process.env.PORT}`)
})