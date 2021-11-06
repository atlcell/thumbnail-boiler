// example run : node sharp-convert.js ~/Projects/docs/public/images/output/new

const fs = require('fs');
const process = require('process')
const path = require('path')
const glob = require("glob")
const dir = process.argv[2]
const input_path = path.join(dir, '**', '*.{jpg,png}')
const output_path = path.join(dir, "thumb")
const sharp = require('sharp')

glob(input_path, function (err, files) {
  if (err != null) { throw err; }

  fs.mkdirSync(output_path, { recursive: true });

  files.forEach(function(inputFile) {

  sharp(inputFile)
    .jpeg({ mozjpeg: true, quality: 60, force: true })
    .toFile(
      path.join(output_path, path.basename(inputFile, path.extname(inputFile))+'.jpg'), (err, info) => {
      
      if(err === null) {
          console.log('successfully compressed ' + inputFile);
          /*
          fs.unlink(inputFile, (err2) => {
              if (err2) throw err2;
          });
          */
      } else { throw err }

    });
  });
});