module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({

	    typescript: {
	      base: {
	        src: ['app/*.ts'],
	        dest: './dist/aplication.js',
	        options: {
	          target: 'es5' //or es3
	        }
	      }
	    },

		  watch: {
		    files: 'app/**/*.ts',
		    tasks: ['typescript']
		  }

	});

	grunt.registerTask('default', 'watch');
}