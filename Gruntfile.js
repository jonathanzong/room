module.exports = function(grunt) {
  // http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
  grunt.initConfig({
    imagemin: {
      winter: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: 'assets/images/winter',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'assets/images/winter',
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
};