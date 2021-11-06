const fs = require('fs');
const process = require('process')
const path = require('path')
const glob = require("glob")
const dir = process.argv[2]
const input_path = path.join(dir, '**', '*.{mp4,mov,gifv}')
const output_path = path.join(dir, "thumb")
const sharp = require('sharp')
const ffmpeg = require('fluent-ffmpeg');

glob(input_path, function (err, files) {
  if (err != null) { throw err; }

  fs.mkdirSync(output_path, { recursive: true });

  //console.log(files);

  files.forEach(function(inputFile, index) {

  	let filename = inputFile.split(/(\\|\/)/g).pop();

  	console.log(filename, inputFile, index);

  	/*
	ffmpeg(inputFile).outputOptions([
	  '-ss 00:00:00',
	  '-t 00:00:02',
	  'output22.mp4'
	]);
	*/

	let startTimeInSeconds = 0;
	let fragmentDurationInSeconds = 2;

	ffmpeg()
	  .input(inputFile)
	  .inputOptions([`-ss ${startTimeInSeconds}`])
	  .outputOptions([`-t ${fragmentDurationInSeconds}`])
	  .noAudio()
	  .output(output_path + '/' + filename)
	  .on('end', () => {})
	  .on('error', () => {})
	  .run();

  	/*
  sharp(inputFile)
    .jpeg({ mozjpeg: true, quality: 60, force: true })
    .toFile(
      path.join(output_path, path.basename(inputFile, path.extname(inputFile))+'.jpg'), (err, info) => {
      
      if(err === null) {
          console.log('successfully compressed ' + inputFile);
          
          fs.unlink(inputFile, (err2) => {
              if (err2) throw err2;
          });
          
      } else { throw err }

    });
    */
  });
});