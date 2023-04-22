const fs = require('fs');
const {
    readFile,
    writeFile
} = fs.promises;
const process = require('process');
const axios = require('axios');

async function write(path, contents) {
    try {
        await writeFile(path, contents, 'utf8');
    } catch (error) {
        console.error(`error writing ${path}: ${error}`);
        process.exit(1);
    }
}
async function cat(path) {
    try {
        return await readFile(path, 'utf8');
    } catch (error) {
        console.error(`error reading ${path}: ${error} `);
        process.exit(1);
    }
}
async function webCat(url) {
    try {
        const {
            data
        } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(`error fetching ${url}: ${error}`);
        process.exit(1);
    }
}

async function main() {
    let path;
    let out;
    if (process.argv[2] === '--out') {
        out = process.argv[3];
        path = process.argv[4];
    } else {
        path = process.argv[2];
    }
    const contents = await cat(path);
    const urls = contents.split('\n').map((line) => line.trim());
    for (let url of urls) {
        const hostname = url && url.length > 0 ? url.split('/')[2] : null;
        if (hostname) {
            const html = await webCat(url);
            await write(hostname, html);
            console.log(`Wrote to ${hostname}`);
        }
    }
}

main();