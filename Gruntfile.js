module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['sass/*.sass'],
        tasks: ['sass'],
        options: {
            spawn: false,
            lineNumbers: true
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        files: {
          'new-styles.css': 'sass/new-styles.sass',
          'styles.css': 'sass/styles.sass'
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch', 'sass']);

};
