const fs = require('fs');
const unzipper = require('unzipper');

fs.createReadStream('D:\Sem 7\Assignment 1\nodejs_programs\Problem_4\output.zip')
  .pipe(unzipper.Extract({ path: 'extracted/' }))
  .on('close', () => console.log('Extraction complete.'));
  