const fs = require('fs');
const axios = require('axios');
const { exit } = require('process');
const path = process.argv[2];

// function to read a file
function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n Error: ${err.message}`);
            process.exit(1);
        }
        console.log(data);
    });
}



// function to fetch content from a URL
async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (err) {
        console.error(`Error fetching ${url}:\n Error: Request failed with status code ${err.response.status}`);
        process.exit(1);
    }
}


// function to check if argument is a file path or URL and calls either cat or webCat respectively.
function handleArg(input) {
    if (input.startsWith('http')) {
        webCat(input);
    } else {
        cat(input);
    }
}

handleArg(path);