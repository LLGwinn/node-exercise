const fs = require('fs');
const process = require('process');
const axios = require('axios');

function processRequest(content, output) {
    if (output) {
        let outputPath = `./${output}`;

        fs.writeFile(outputPath, content, 'utf8', (err) => {
            if (err) {
                console.log(`Couldn't write to ${outputPath}: ${err}`);
                process.exit(1);
            }
            else {
                process.exit(0);
            }
        });
    }
    else {
        console.log(content);
    } 
}

function cat(input, output) {
    fs.readFile(input, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${input}`, err);
            process.exit(1);
        }
        else {
            processRequest(data, output);
        }
    });
}

async function webCat(input, output) {
    try {
        let response = await axios.get(input);
        processRequest(response.data, output);
    }
    catch (err) {
        console.log(`Error fetching ${input}: ${err}`);
        process.exit(1)
    }
}

let inputPath;
let outputPath;

if (process.argv[2] === '--out') {
    inputPath = process.argv[4];
    outputPath = process.argv[3];
}
else {
    inputPath = process.argv[2]
}

if (inputPath.search('http') >= 0) {
    webCat(inputPath, outputPath);
}
else {
    cat(inputPath, outputPath);
}
