var nudossi = require('./nudossi');

module.exports = function (grunt) {

  grunt.registerMultiTask('nudossi', function () {
    var options = this.options({});
    nudossi.bump(options, this.async());
  });

};