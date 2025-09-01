const fs = require('fs');

// Create file
fs.writeFileSync('fsFunction_File.txt', 'Hello');

// Read file
const data = fs.readFileSync('fsFunction_File.txt', 'utf-8');
console.log('Data:', data);

// Append file
fs.appendFileSync('new_fsFunction_File.txt', '\nWorld');

// Rename file
fs.renameSync('fsFunction_File.txt', 'new_fsFunction_File.txt');
