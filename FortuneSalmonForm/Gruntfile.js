/* global module:false */
module.exports = function (grunt) {
	var port = grunt.option('port') || 8082;
	var base = grunt.option('base') || '.';
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: port,
          base: base,
          livereload: true,
          open: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: [ 'Gruntfile.js' ],
        tasks: 'js'
      },
      html: {
        files: [ 'index.html']
      }
    }
  });
  // Dependencies
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );

  // Default task
  grunt.registerTask( 'default', [ 'css', 'js' ] );
  grunt.registerTask( 'serve', [ 'connect', 'watch' ] );
}
