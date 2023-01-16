import { app, ipfs, toBuffer } from '../add-ons/index.js'

app.get('/', async (req, res) => {
    res.send('WELCOME TO FULAZO - NODE')
})

app.get('/uploadFiles', async (req, res) => {
    // const { file, filename } = req.body

    try {
        /* EXAMPLE data from request */
        let sampleData = {
            file: 'this is the uploaded file',
            filename: 'randomfile.txt'
        }

        async function addFile(data) {

            return await ipfs.add({
                path: data.filename,
                content: data.file
            })

        }

        const result = await addFile(req.body || sampleData)

        console.log(result)

        res.send(result.cid.toString())
    }
    catch (error) {
        res.send(error)
    }

})

app.get('/getFiles/:cid', async (req, res) => {
    const cid = req.params.cid

    try {
        /* EXAMPLE */
        const content = await ipfs.cat(cid)

        let result = Buffer.alloc(0)

        for await (const chunk of content) {
            result = Buffer.concat([result, Buffer.from(chunk)])
        }

        console.log(result.toString())

        res.send(result.toString())
    }
    catch (error) {
        res.send(error)
    }
})

/* For 404 redirect */
app.use(function (req, res, next) {
    return res.status(404).send({ message: 'The Page You Requested Was Not found.' });
});