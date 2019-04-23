var yargs = require('yargs')
var argv = yargs.argv;

var moment = require('moment')
var filename = argv.filename + '-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.zip'

var fs = require('fs');
var archiver = require('archiver');

var output = fs.createWriteStream(__dirname + '../../../' + filename);

var archive = archiver('zip', {
  zlib: { level: 9 },
  forceLocalTime: true 
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log(filename + ' 已被写入')
});

output.on('end', function() {
  console.log(filename + ' 已被写入')
});

archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn(error)
    // log warning
  } else {
    // throw error
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

archive.directory('./dist/', false);

archive.finalize();


