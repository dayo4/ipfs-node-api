const { app } = require('../add-ons')
const client = require('ipfs-http-client')
const fs = require('fs-extra')
const path = require('path');
const json_path = path.join(__dirname, '../public/bcjson.json')

const projectId = process.env.PROJECT_ID;
const projectSecret = process.env.PROJECT_SECRET;
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const clientConfig = {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
}


app.get('/', async (req, res) => {
    res.send('WELCOME TO FULAZO - NODE')
})

app.post('/uploadFiles', async (req, res) => {
    // const { file, filename, filetype } = req.body

    try {
        const ipfs = client.create(clientConfig)

        const result = await ipfs.add({
            path: req.body.filename,
            content: req.body.file
        })

        const cid = result.cid.toString()

        const bcjson = await fs.readJSON(json_path)
        const exists = bcjson.find(obj => {
            return obj.cid === cid
        })  

        if (!exists) {
            bcjson.push({
                filename: req.body.filename,
                filetype: req.body.filetype,
                cid: cid
            })
        }

        await fs.writeJSON(json_path, bcjson)

        res.send(cid)

    } catch (error) {
        res.send(error)
    }

})

app.get('/getFiles/:cid', async (req, res) => {
    const cid = req.params.cid

    try {
        const ipfs = client.create(clientConfig)

        const content = await ipfs.cat(cid)

        let result = Buffer.alloc(0)

        for await (const chunk of content) {
            result = Buffer.concat([result, Buffer.from(chunk)])
        }

        const bcjson = await fs.readJSON(json_path)
        const index = bcjson.findIndex(obj => {
            return obj.cid === cid
        })

        let object = {
            filename: '',
            filetype: ''
        }
        if (index >= 0) {
            object = bcjson[index]
        }

        res.send({
            file: result.toString(),
            filename: object.filename,
            filetype: object.filetype
        })

    } catch (error) {
        res.send(error)
    }
})

/* For 404 redirect */
app.use(function (req, res, next) {
    return res.status(404).send({ message: 'The Page You Requested Was Not found.' });
});