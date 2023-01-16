import { app } from './add-ons/index.js'


//Import Endpoints
import './routes/index.js'

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Fulazo-Node-Dev listening on http://${process.env.HOST}:${process.env.PORT}`)
})