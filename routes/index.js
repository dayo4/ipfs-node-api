import { app, ipfs, toBuffer } from '../plugins/index.js'

app.get('/', async (req, res) => {
    res.send('WELCOME TO FULASO - NODE')
})

app.get('/uploadFiles', async (req, res) => {
    // const { id, file, filename } = req.body

    try {
        /* EXAMPLE */
        let data = JSON.stringify({
            id: '1',
            file: 'uploaded file',
            filename: 'filename'
        })
        const result = await ipfs.add(data/* Example */)

        console.log(result.cid.toString())

        res.send(result.cid.toString())
    }
    catch (error) {
        res.send('Error!')
    }

})

app.get('/getFiles/:cid', async (req, res) => {
    const cid = req.params.cid

    try {
        /* EXAMPLE */
        const content = await ipfs.cat(cid || 'QmW7fEEhHZgC5nLSsiZNuSJJd2oj2DneoPrvcyQM1YZD1e')

        const decoder = new TextDecoder()

        let result = ''
        for await (const chunk of content) {
            result += decoder.decode(chunk, { stream: true })
        }

        console.log(JSON.parse(result))

        res.send(JSON.parse(result))
    }
    catch (error) {
        res.send('Error!')
    }
})

/* For 404 redirect */
app.use(function (req, res, next) {
    return res.status(404).send({ message: 'The Page You Requested Was Not found.' });
});