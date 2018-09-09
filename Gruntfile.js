module.exports = function(grunt){

    grunt.registerTask("TEST", "To jest testowe zadanie",function() {
        grunt.log.ok("Zadanie wykonane!!!");
    });

    grunt.initConfig({

        clean: {
            dev: {
                src: ['src/css/*'],
            },
            prod: {
                src: ['dist/*', 'dist/**/*'],
            }
        },

        jshint: {
            dev: {
                /**sprawdza === i daje errora kiedy == */
                options: {
                    eqeqeq: true,
                },
                src: ["src/js/**/*.js", "!src/js/scripts/*.js"]
            }
        },

        sass: {
            dev: {
                options: {
                    sourcemap: 'none',
                    style: 'expanded'
                },
                src: "src/sass/style.scss",
                dest: "src/css/style.css",
            }
        },

        autoprefixer: {
            dev: {
                // src: "src/css/style.css",
                /**wszystkie pliki css w projekcie od razu  */
                src: "src/css/*.css",
                /** wsparcie i kompatybilność wsteczna dla przegladarek */
                options: {
                    browsers: ['last 3 versions', 'ie 8', 'ie 9'],
                },
            }
        },

        coffee: {
            dev: {
                src: "src/coffee/app.coffee",
                dest: "dist/resultCoffee.js",
            }
        },

        concat: {
            prod: {
                options: {
                    separator: ';',
                },
                /** tutaj podajemy pliki w kolejności!!! */
                src: ['src/js/**/*.js'],
                dest: 'dist/built.js',
            },
        },

        uglify: {
            prod: {
                files: {
                    'dist/built.min.js': 'dist/built.js',
                },
                options: {
                    mangle: false,
                },
            }
        },

        cssmin: {
            prod: {
                files: {
                    'dist/css/style.min.css': ['src/css/style.css'],
                }
            }
        },

        htmlmin: {
            options:{
                collapseWhitespace: true,
            },
            prod: {
                files: {
                    'dist/index.min.html': ['src/index.html'],
                }
            }
        },

        imagemin: {
            options: {
                optimizationLevel: 3,
            },
            prod:{
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }],
            },
        },

        watch:{
            options:{
                livereload: true,
            },
            dev:{
                /**wszystkie pliki */
                files: ["src/**/*"],
                tasks: ['dev'],
            },
        },

        // htmlcopy:{
        //     src: "src/index.html",
        //     dest: "dist/index.html",
        // },
        /**multitask */
        htmlcopy:{
            prod:{
                src: "src/index.html",
                dest: "dist/index.html",
            }
        },

        csscopy:{
            src: "src/css/style.css",
            dest: "dist/css/style.css",
        },

    });

    /***
     * Plugins
     * */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /**
     * My registerTask
     */

    // grunt.registerTask("htmlcopy", "Kopiuje pliki html", function () {
    //     var src = grunt.config.get("htmlcopy.src");
    //     var dest = grunt.config.get("htmlcopy.dest");

    //     grunt.file.copy(src, dest);
    //     grunt.log.ok("Plik html przekopiowano");
    //     var msg = "Z " + src + " do " + dest;
    //     grunt.log.write(msg);

    // });

    grunt.registerMultiTask("htmlcopy", "Kopiuje pliki html", function () {
        // console.log(this);

        /**1 */
        // var src = this.data.src;
        // var dest = this.data.dest;
        // grunt.file.copy(src, dest);
        // grunt.log.ok("Plik htnl przekopiowano");
        // var msg = "Z " + src + " do " + dest;
        // grunt.log.write(msg);
        
        /** 2 */
        this.files.forEach(function (obj) {

            var src = null;
            var dest = null;

            for( var key in obj ){
                if (key === 'src'){
                    src = obj[key];
                    if (typeof src === 'object'){
                        for( var i in src ){
                            src = src[i]
                        }
                    } 
                } else if(key === 'dest'){
                    dest = obj[key];
                }
            };
            grunt.file.copy(src, dest);
            grunt.log.ok("Plik htnl przekopiowano");
            var msg = "Z " + src + " do " + dest;
            grunt.log.write(msg);
        });
    });

    grunt.registerTask("csscopy", "Kopiuje pliki css", function () {
        var src = grunt.config.get("csscopy.src");
        var dest = grunt.config.get("csscopy.dest");

        grunt.file.copy(src, dest);
        grunt.log.ok("Plik css przekopiowano");
        var msg = "Z " + src + " do " + dest;
        grunt.log.write(msg);

    });

    /***
     * TASK
     * */
    var DEV = [
        'clean:dev',
        'jshint',
        'sass',
        'autoprefixer',
        'coffee',
    ];

    var PROD = [
        'clean:prod',
        'concat',
        'uglify:prod',
        'cssmin',
        'htmlmin',
        'imagemin',
        'htmlcopy',
        'csscopy',
    ];


    /***
     * registerTask
     * */
    grunt.registerTask("dev", DEV); //=> 'clean:dev','jshint','sass','autoprefixer','coffee',
    grunt.registerTask("prod", PROD); //=> 'clean:prod','concat','uglify:prod','cssmin','htmlmin','imagemin', 'htmlcopy', 'csscopy',
    grunt.registerTask("default", "watch"); // => "watch"
    grunt.registerTask("build", ["dev", "prod"]); // => "dev" and "prod"
};