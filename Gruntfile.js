module.exports = function(grunt) {
    grunt.initConfig({
        postcss: {
            options: {
                processors: [
                    require('pixrem'),
                    require('autoprefixer')({browsers: ['> 0%']}),
                    require('postcss-flexboxfixer'),
                    require('cssnano')({autoprefixer:false,zindex: false})
                ]
            },
            po: {
                files: [{
                    expand:true,
                    flatten:true,
                    cwd: 'assets/',
                    src: ['scss/*.css', '!**/variables.css'],
                    dest:'assets/css/'
                }]
            }
        },
        sass: {
            dist: {
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
            styles: {
                files: [
                    'assets/scss/*.scss'
                ],
                tasks:['sass','postcss:po']
            }
        }
    });
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ["watch:styles"]);
    grunt.registerTask('po', ["sass:dist","postcss:po"]);
};