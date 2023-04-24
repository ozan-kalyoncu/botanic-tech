'use strict';
module.exports = function (grunt) {
  const sass = require('node-sass');
  grunt.initConfig({
    theme_slugname: 'botanik-app',
    // let us know if our JS is sound.
    jshint: {
      options: {
        "bitwise": true,
        "browser": true,
        "curly": true,
        "eqeqeq": true,
        "eqnull": true,
        "immed": true,
        "jquery": true,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "node": true,
        "strict": false,
        "undef": false,
        "esversion": '8'
      },
      all: [
        'Gruntfile.js',
        'assets/js/plugins/app.js',
      ]
    },

    // concatenation and minification all in one.
    uglify: {
      dist: {
        files: {
          'assets/js/vendor.min.js': [
            'assets/js/vendor/*.js'
          ],
          'assets/js/app.min.js': [
            'assets/js/plugins/app.js'
          ]
        }
      }
    },

    concat: {
      options: {
        stripBanners: true
      },
      dist: {
        src: 'assets/js/vendor/*.js',
        dest: 'assets/js/vendor.min.js',
      }
    },

    // style (Sass) compilation.
    sass: {
      dist: {
        options: {
          implementation: sass,
          includePaths: [
            'node_modules/foundation-sites/scss',
            'node_modules/compass-mixins/lib'
          ],
          outputStyle: 'compressed'
        },
        files: {
         './src/assets/css/App.css': './src/assets/sass/app.scss',
         './src/assets/css/login.css': './src/assets/sass/pages/login.scss',
        }
      },
      dev: {
        options: {
          implementation: sass,
          includePaths: [
            'node_modules/foundation-sites/scss',
            'node_modules/compass-mixins/lib'
          ],
          style: 'expanded'
        },
        outputStyle: {
          'assets/css/app.css': 'assets/sass/app.scss',
          'assets/css/article.css': 'assets/sass/article.scss',
          'assets/css/category.css': 'assets/sass/category.scss',
          'assets/css/destek.css': 'assets/sass/destek.scss',
          'assets/css/widget.css': 'assets/sass/widget.scss',
          'assets/css/blocks/sss.css': 'assets/sass/blocks/sss.scss',
          'assets/css/blocks/yayin-akisi.css': 'assets/sass/blocks/yayin-akisi.scss',
          'assets/css/frontpage.css': 'assets/sass/frontpage.scss',
          'assets/css/blocks/icon-list.css': 'assets/sass/blocks/icon-list.scss',
          'assets/css/blocks/paket.css': 'assets/sass/blocks/paket.scss',
          'assets/css/404.css': 'assets/sass/404.scss',
          'assets/css/editor-style.css': 'assets/sass/editor-style.scss',
          'assets/css/admin.css': 'assets/sass/admin.scss',
          'assets/css/blocks/vertical-accordion.css': 'assets/sass/blocks/vertical-accordion.scss',
          'assets/css/match-table.css': 'assets/sass/match-table.scss',
          'assets/css/blocks/formula-1-schedule.css': 'assets/sass/blocks/formula-1-schedule.scss',
          'assets/css/blocks/formula-1-circuit.css': 'assets/sass/blocks/formula-1-circuit.scss',
          'assets/css/blocks/match-highlights.css': 'assets/sass/blocks/match-highlights.scss',
          'assets/css/blocks/formula-1-team-standing.css': 'assets/sass/blocks/formula-1-team-standing.scss',
          'assets/css/blocks/horizontal-menu.css': 'assets/sass/blocks/horizontal-menu.scss',
          'assets/css/blocks/breadcrumb.css': 'assets/sass/blocks/breadcrumb.scss',
          'assets/css/blocks/image.css': 'assets/sass/blocks/image.scss',
        },
      }
    },

    // watch our project for changes.
    watch: {
      sass: {
        files: [
          './src/assets/sass/*',
          './src/assets/sass/*/*'
        ],
        tasks: ['sass:dist']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['uglify']
      }
    },

    // copy folder.
    copy: {
      main: {
        expand: true,
        src: ['**', '!**/node_modules/**'],
        dest: '/Users/anteksiler/Desktop/themeforest/<%= theme_slugname %>/<%= theme_slugname %>',
      },
    },
    // clean folder.
    clean: {
      options: {
        'force': true
      },
      dest: [
        '/Users/anteksiler/Desktop/themeforest/<%= theme_slugname %>/<%= theme_slugname %>/**/*',
      ],
      build: [
        '/Users/anteksiler/Desktop/themeforest/<%= theme_slugname %>/<%= theme_slugname %>/**/.git',
        '/Users/anteksiler/Desktop/themeforest/<%= theme_slugname %>/<%= theme_slugname %>/**/.gitignore',
        '/Users/anteksiler/Desktop/themeforest/<%= theme_slugname %>/<%= theme_slugname %>/**/.sass-cache',
        '/Users/anteksiler/Desktop/themeforest/<%= theme_slugname %>/<%= theme_slugname %>/**/.DS_Store',
        '/Users/anteksiler/Desktop/themeforest/<%= theme_slugname %>/<%= theme_slugname %>/node_modules',
        '/Users/anteksiler/Desktop/themeforest/<%= theme_slugname %>/<%= theme_slugname %>/composer.lock',
        '/Users/anteksiler/Desktop/themeforest/<%= theme_slugname %>/<%= theme_slugname %>/composer.json',
        '/Users/anteksiler/Desktop/themeforest/<%= theme_slugname %>/<%= theme_slugname %>/package-lock.json',
        '/Users/anteksiler/Desktop/themeforest/<%= theme_slugname %>/<%= theme_slugname %>/Gruntfile.js',
      ],
    },

    // Check textdomain errors.
    checktextdomain: {
      options: {
        text_domain: 'ssportplus',
        keywords: [
          '__:1,2d',
          '_e:1,2d',
          '_x:1,2c,3d',
          'esc_html__:1,2d',
          'esc_html_e:1,2d',
          'esc_html_x:1,2c,3d',
          'esc_attr__:1,2d',
          'esc_attr_e:1,2d',
          'esc_attr_x:1,2c,3d',
          '_ex:1,2c,3d',
          '_n:1,2,4d',
          '_nx:1,2,4c,5d',
          '_n_noop:1,2,3d',
          '_nx_noop:1,2,3c,4d'
        ]
      },
      theme: {
        src: [
          '**/*.php',
          '!node_modules/**',
          '!vendor/**',
        ],
        expand: true
      }
    },

    // Compress.
    compress: {
      theme: {
        options: {
          dot: true,
          archive: '/Users/anteksiler/Desktop/themeforest/<%= theme_slugname %>/<%= theme_slugname %>.zip'
        },
        files: [{
          expand: true,
          cwd: '/Users/anteksiler/Desktop/themeforest/<%= theme_slugname %>/',
          src: ['<%= theme_slugname %>/**/*', '<%= theme_slugname %>/.nvmrc']
        }]
      }
    }
  });

  // load tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-strip-code');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-checktextdomain');

  // register task.
  grunt.registerTask('default', [
    'jshint',
    'sass:dev'
  ]);

  grunt.registerTask('release', [
    'sass:dist',
    'watch'
  ]);

  grunt.registerTask('styles', [
    'sass:dist',
    'uglify',
  ]);

  grunt.registerTask('scripts', [
    'jshint',
    'uglify',
  ]);

  grunt.registerTask('pack', [
    'checktextdomain:theme',
    'clean:dest',
    'copy',
    'clean:build',
    'compress:theme',
  ]);
};
