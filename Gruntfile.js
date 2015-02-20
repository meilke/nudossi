module.exports = function(grunt) {
  var files = [ 'tasks/**/*.js', 'test/**/*.js' ];

  var packageName = grunt.option('packageName');
  var newVersion = grunt.option('newVersion');
  var path = grunt.option('path');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: { 
      files: files, 
      options: {
        quotmark: 'single'
      }
    },
    mochaTest: {
      test: {
        options: { reporter: 'spec' },
        src: files
      }
    },
    release: {
      options: { commitMessage: 'NPM Release v<%= version %>' }
    },
    nudossi: {
      options: {
        packageName: packageName,
        newVersion: newVersion,
        path: path
      },
      do: {}
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask('default', [ 'jshint', 'mochaTest' ]);
}