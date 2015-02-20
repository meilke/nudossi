var recursive = require('recursive-readdir'),
    fs = require('fs'),
    _ = require('lodash'),
    q = require('q'),
    bluebird = require('bluebird');

function writeFile (pathToFile, data) {
  var deferred = q.defer();
  fs.writeFile(pathToFile, data, 'utf8', deferred.makeNodeResolver());
  return deferred.promise;
}

function readFile (pathToFile) {
  var deferred = q.defer();
  fs.readFile(pathToFile, 'utf8', deferred.makeNodeResolver());
  return deferred.promise;
}

exports.bump = function(options, done) {
  
  if ( !options ||
       !options.packageName || options.packageName === '' ||
       !options.newVersion || options.newVersion === '' ||
       !options.path || options.path === '') {
    throw new Error('Bad configuration!');
  }

  var hintPathRegex = new RegExp('(' + options.packageName + '.)[0-9A-Za-z-.]+\\\\', 'g');
  var includeRegex = new RegExp('(Include="' + options.packageName + ',.+Version=)[0-9A-Za-z-.]+(.*">)', 'g');
  var packageConfigRegex = new RegExp('(package id="' + options.packageName + '".+version=")[0-9A-Za-z-.]+(".*/>)', 'g');

  recursive(options.path, function (err, files) {
    
    filteredFiles = _.filter(files, function (file) { return _.includes(file, '.csproj') || _.includes(file, 'packages.config'); });
    var promises = filteredFiles.map(function (fileName) {
      return readFile(fileName)
                        .then(function (data) {
                          var result = data
                                        .replace(hintPathRegex, '$1' + options.newVersion + '\\')
                                        .replace(includeRegex, '$1' + options.newVersion + '$2')
                                        .replace(packageConfigRegex, '$1' + options.newVersion + '$2');
                          return writeFile(fileName, result);
                        });
    });

    bluebird.all(promises).then(function () {done();});

  });  

};