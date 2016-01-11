module.exports = function(grunt) {
  // http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
  grunt.initConfig({
    imagemin: {
      all: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: 'assets/images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'assets/images/',
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
};