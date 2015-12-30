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
                reporterOutput:'jshint.txt'
            },
            otherThanFile: ["dist/**/*.js"]
        },
        uglify:{
            options:{
                // mangle:true, default is true
                // compress:true, default is true
                screwIE8: true
            },
            ugly:{
                files:{
                    'dist/output.min.js':['dist/hede.js']
                }
            }
        },
        clean:{
            options:{
                
            },
            hede:['dist/*']
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean','ts', 'jshint', 'uglify']);
};