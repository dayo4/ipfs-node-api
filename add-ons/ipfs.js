import * as ipfsClient from 'ipfs-http-client';

const projectId = process.env.PROJECT_ID;
const projectSecret = process.env.PROJECT_SECRET;

const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export default ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});