// Generated on 2016-02-10 using generator-angular 0.15.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);


  // Define the configuration for all the tasks
  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      sass: {
          files: ['./styles/scss/*.scss'],
          tasks: ['sass']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          './{,*/}*.html',
          './styles/{,*/}*.css',
          './images/{,*/}*.{png,jpg,jpeg,gif}'
        ]
      },
      js: {
        files: ['./*.js', './**/*.js'],
        tasks: ['jshint:all']
      }
    },
    jshint: {
      options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish')
      },
      all: [
          'Gruntfile.js',
          './scripts/*.js'
      ]
    },
    sass: {
        dist: {
            files: [{
                expand: true,
                cwd: '.',
                src: ['./styles/scss/*.scss'],
                dest: './styles',
                ext: '.css',
                flatten: true
            }]
        }
      },
          // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),

              connect().use(
                './styles',
                connect.static('./styles')
              ),
              connect.static('./')
            ];
          }
        }
      }
    }
  });

  grunt.registerTask('default', [
    'sass',
    'connect:livereload',
    'watch'
  ]);

   grunt.registerTask('lint', [
    'newer:jshint:all'
    ]
  );

};
