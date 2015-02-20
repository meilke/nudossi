module.exports = function(grunt) {
  var files = [ 'tasks/**/*.js', 'test/**/*.js' ];

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
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask('default', [ 'jshint', 'mochaTest' ]);
}