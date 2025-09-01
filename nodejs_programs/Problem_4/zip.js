const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream('output.zip');
const archive = archiver('zip');

output.on('close', () => {
  console.log(`Created zip (${archive.pointer()} total bytes)`);
});

archive.pipe(output);
// archive.directory('D:/Express/', 'FolderZipped'); // folder-to-zip must exist

// Absolute path to file you want to zip
const fileToZip = '"D:\Sem 6\Syllabus.pdf"';

// Add the file to the archive (2nd argument is name inside zip)
archive.file(fileToZip, { name: 'FileZipped.pdf' });

archive.finalize();
