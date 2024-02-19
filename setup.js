const fs = require('fs');
const path = require('path');

const directories = [
    'src/components',
    'src/containers',
    'src/hooks',
    'src/context',
    'src/services',
    'src/assets',
    'src/utils',
];

const files = [
    'src/App.js',
    'src/index.js',
];

function createDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Directory created: ${dir}`);
    } else {
        console.log(`Directory already exists: ${dir}`);
    }
}

function createFile(file) {
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '');
        console.log(`File created: ${file}`);
    } else {
        console.log(`File already exists: ${file}`);
    }
}

directories.forEach(createDirectory);
files.forEach(createFile);

console.log('Basic React project structure generated successfully.');
