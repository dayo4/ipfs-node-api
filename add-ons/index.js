// Initialize App with primary plugins
import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())

//Import Internal Plugins
import ipfs from './ipfs.js'

// Add other plugins


export {
    app,
    ipfs,
}