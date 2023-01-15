import { app } from './plugins/index.js'


//Import Endpoints
import './routes/index.js'

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Fulaso-Node-Dev listening on http://${process.env.HOST}:${process.env.PORT}`)
})