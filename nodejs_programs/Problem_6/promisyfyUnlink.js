const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

async function deleteFile(filePath) {
  try {
    await unlinkAsync(filePath);
    console.log('File deleted!');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

deleteFile('delete-me.txt');  // file must exist
