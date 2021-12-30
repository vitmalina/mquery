/* eslint-env node */
const gulp     = require('gulp')
const header   = require('gulp-header')
const uglify   = require('gulp-uglify')
const concat   = require('gulp-concat')
const rename   = require('gulp-rename')
const replace  = require('gulp-replace')
const del      = require('del')

const comments = {
    mquery : '/* mQuery 0.1.x (nightly) ('+ (new Date()).toLocaleString('en-us') +'), vitmalina@gmail.com */\n'
}


let tasks = {

    clean(cb) {
        let files = [
            'dist/mquery.js',
            'dist/mquery.min.js'
        ]
        return del(files)
    },

    build(cb) {
        return gulp
            .src('src/mquery.js')
            .pipe(concat('mquery.js'))
            .pipe(replace('\n\n', '\n'))
            .pipe(header(comments.mquery))
            .pipe(gulp.dest('dist/'))
            // min file
            .pipe(uglify({
                warnings: false,
                sourceMap: false
            }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(header(comments.mquery))
            .pipe(gulp.dest('dist/'))
            .on('end', () => {
                cb()
            })
    },

    watch(cb) {
        gulp.watch(['src/**/*.js'], tasks.build)
    }
}

exports.default = gulp.series(tasks.clean, tasks.build)
exports.build   = tasks.build
exports.dev     = tasks.watch
exports.clean   = tasks.clean