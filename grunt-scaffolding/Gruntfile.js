(function () {

    'use strict';

    var fs = require('fs');

    module.exports = function (grunt) {

        // Project configuration.
        grunt.initConfig({
            // Task configuration.
            jshint: {
                options: {
                    curly: true,
                    eqeqeq: true,
                    immed: true,
                    latedef: true,
                    newcap: true,
                    noarg: true,
                    sub: true,
                    undef: true,
                    unused: true,
                    boss: true,
                    eqnull: true,
                    globals: {
                        module: true,
                        require: false
                    }
                },
                gruntfile: {
                    src: 'Gruntfile.js'
                },
                lib_test: {
                    src: ['lib/**/*.js', 'test/**/*.js']
                }
            },
            nodeunit: {
                files: ['test/**/*_test.js']
            },
            watch: {
                gruntfile: {
                    files: '<%= jshint.gruntfile.src %>',
                    tasks: ['jshint:gruntfile']
                },
                lib_test: {
                    files: '<%= jshint.lib_test.src %>',
                    tasks: ['jshint:lib_test', 'nodeunit']
                }
            },
            checkFileSize: {
                options: {
                    folderToScan: './src'
                },
                target:{
                    
                }
            }
        });

        // These plugins provide necessary tasks.
        grunt.loadNpmTasks('grunt-contrib-nodeunit');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-watch');

        // Default task.
        grunt.registerTask('default', ['jshint', 'nodeunit', 'checkFileSize']);

        grunt.registerTask('checkFileSize', 'Task to check file sized', function (debug) {
            grunt.log.writeflags(this, 'this');
            grunt.log.writeln(this.options);

            var options = this.options({
                folderToScan: '',
                babaannesi: 'ciko'
            });
            grunt.log.writeflags(options, 'options');

            if (this.args.length !== 0 && debug !== undefined) {
                grunt.log.writeln(debug);
            }
            
            grunt.file.recurse(options.folderToScan, function (absPath, rootDir, subDir, fileName) {
                if (!grunt.file.isFile(absPath)) {
                    return;
                }

                grunt.log.writeflags(fs, 'fs');
                var stats = fs.statSync(absPath);
                var asKB = stats.size / 1024;
                grunt.log.writeln('Found file %s with the size of %s KB.', fileName, asKB);
            });
        });

    };

})();
