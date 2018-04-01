module.exports = function (grunt) {
  grunt.initConfig({
    postcss: {
      options: {
        processors: [
          require('pixrem'),
          require('autoprefixer')({browsers: ['> 0%']}),
          require('postcss-flexboxfixer'),
          require('cssnano')({autoprefixer: false, zindex: false})
        ]
      },
      build: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'assets/',
          src: ['scss/*.css', '!**/variables.css'],
          dest: 'assets/css/'
        }]
      }
    },
    sass: {
      build: {
        files: [{
          expand: true,
          cwd: 'assets/scss',
          src: ['**/*.scss'],
          dest: 'assets/scss',
          ext: '.css'
        }]
      }
    },
    watch: {
      sass: {
        files: [
          'assets/scss/*.scss'
        ],
        tasks: ['sass', 'postcss']
      }
    }
  });
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('build', ["js","css"]);
  grunt.registerTask('js', []);
  grunt.registerTask('css', ["sass", "postcss"]);
  grunt.registerTask('default', ["build"]);
  grunt.registerTask('w', ["watch:sass"]);
};