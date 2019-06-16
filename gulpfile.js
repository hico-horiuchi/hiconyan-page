const { src, dest, parallel } = require('gulp');
const slm = require('gulp-slm');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const csso = require('gulp-csso');

const config = new Map([
  ['src', new Map([
    ['slm', 'src/slm/*.slm'],
    ['scss', 'src/scss/*.scss']
  ])],
  ['dest', new Map([
    ['html', 'public'],
    ['css', 'public']
  ])]
]);

sass.compiler = require('node-sass');

html = () => {
  return src(config.get('src').get('slm'))
    .pipe(slm())
    .pipe(dest(config.get('dest').get('html')))
}

css = () => {
  return src(config.get('src').get('scss'))
    .pipe(sass())
    .pipe(postcss([
      require('tailwindcss'),
      require('autoprefixer')
    ]))
    .pipe(csso())
    .pipe(concat('app.min.css'))
    .pipe(dest(config.get('dest').get('css')))
}

exports.html = html;
exports.css = css;
exports.default = parallel(html, css);
