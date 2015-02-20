var nudossi = require('./nudossi');

module.exports = function (grunt) {

  grunt.registerMultiTask('nudossi', function () {
    var options = this.options({});
    nudossi.bump(shell, options, this.async());
  });

};