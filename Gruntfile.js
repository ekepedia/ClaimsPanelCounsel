var config = require( './config' );
var counsel = require('./counsel');

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'public/**/*.js', 'routes/**/*.js','models/**/*.js']
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('load', 'Load Data', function() {
    grunt.log.writeln('Loading data from ' + config.excel.fileName);
    counsel.reset(config.excel.fileName);
  });

};