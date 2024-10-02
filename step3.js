const fs = require('fs');
const axios = require('axios');
const { exit } = require('process');

function cat(path, outputPath) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n Error: ${err.message}`);
            process.exit(1);
        } else {
            handleOutput(data, outputPath);
        }
    });
}


async function webCat(url, outputPath) {
    try {
        const response = await axios.get(url);
        handleOutput(response.data, outputPath);
    } catch (err) {
        console.error(`Error fetching ${url}:\n Error: Request failed with status code ${err.response.status}`);
        process.exit(1);
    }
}


function handleOutput(data, outputPath) {
    if (outputPath){
        fs.writeFile(outputPath, data, 'utf8', (err) => {
            if (err) {
                console.error(`Couldn't write ${outputPath}:\n Error: ${err.message}`);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}

const args = process.argv.slice(2);
let outputPath;
let inputPath;

if (args[0] === '--out') {
    outputPath = args[1];
    inputPath = args[2];
} else {
    inputPath = args[0];
}

if (inputPath) {
    if (inputPath.startsWith('http')) {
        webCat(inputPath, outputPath);
    } else {
        cat(inputPath, outputPath);
    }
} else {
    console.error('Please provide a file path or URL');
    process.exit(1);
}


