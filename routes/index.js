import { app, ipfs } from '../add-ons/index.js'

app.get('/', async (req, res) => {
    res.send('WELCOME TO FULAZO - NODE')
})

app.post('/uploadFiles', async (req, res) => {
    // const { file, filename } = req.body

    try {

        async function addFile(data) {

            return await ipfs.add({
                path: data.filename,
                content: data.file
            })

        }

        const result = await addFile(req.body)

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
        const content = await ipfs.cat(cid)

        let result = Buffer.alloc(0)

        for await (const chunk of content) {
            result = Buffer.concat([result, Buffer.from(chunk)])
        }

        console.log(result.toString('base64'))

        res.send(result.toString('base64'))
    }
    catch (error) {
        res.send(error)
    }
})

/* For 404 redirect */
app.use(function (req, res, next) {
    return res.status(404).send({ message: 'The Page You Requested Was Not found.' });
});