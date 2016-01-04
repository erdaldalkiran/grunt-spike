'use strict'

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            notDefault: {
                src: "src/*.ts",
                out: "dist/hede.js",
                options: {
                    sourceMap: false
                }
            }
        },
        jshint: {
            options: {
                esnext: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: "nofunc",
                newcap: true,
                noarg: true,
                sub: true,
                // undef: true,
                // unused: true,
                boss: true,
                eqnull: true,
                node: true,
                reporterOutput: 'jshint.txt'
            },
            otherThanFile: ["dist/**/*.js"]
        },
        uglify: {
            options: {
                // mangle:true, default is true
                // compress:true, default is true
                screwIE8: true
            },
            ugly: {
                files: {
                    'dist/output.min.js': ['dist/hede.js']
                }
            }
        },
        clean: {
            options: {

            },
            hede: ['dist/*']
        },
        htmlhint: {
            options: {
                //'attr-lowercase': true
                //'attr-value-double-quotes': false
            },
            dev: {
                src: ['src/html/**/*.html']
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                collapseWhitespace: true
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/html/',
                    dest: 'dist/html/',
                    src: '**/*.html'
                }]
            }
        },
        less: {
            dev: {
                options: {
                    modifyVars: {
                        'base': 'red'
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/content/less',
                    dest: 'dist/css',
                    src: '**/*.less',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        csslint: {
            development: {
                options: {

                },
                src: ['dist/css/**/*.css']
            }
        },
        cssmin: {
            dev: {
                options: {

                },
                files: [{
                    expand: true,
                    cwd: 'dist/css/',
                    dest: 'dist/css/',
                    src: '**/*.css',
                    ext:'.min.css',
                    extDot: 'last'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('js', ['clean', 'ts', 'jshint', 'uglify']);
    grunt.registerTask('html', ['clean', 'htmlhint', 'htmlmin', 'less', 'csslint', 'cssmin']);
};