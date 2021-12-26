const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err,data) => {
        if (err) {
            console.log(`Error reading ${path}`, err);
            process.exit(1);
        }
        else {
            console.log(data);
        }
    });
}

async function webCat(url) {
    try {
        let response = await axios.get(url);
        console.log(response.data);
    }
    catch (err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1)
    }
}

if (process.argv[2].search('http') >= 0) {
    webCat(process.argv[2]);
}
else {
    cat(process.argv[2]);
}

