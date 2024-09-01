const { src, dest, parallel, watch } = require("gulp");
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const csso = require("gulp-csso");
const fs = require("fs");
const sass = require("gulp-sass")(require("sass"));
const slm = require("gulp-slm");
const yaml = require("js-yaml");

const config = new Map([
  ["data", new Map([["path", "src/yaml/data.yaml"]])],
  [
    "sass",
    new Map([
      [
        "options",
        {
          includePaths: "./node_modules/",
        },
      ],
    ]),
  ],
  [
    "src",
    new Map([
      ["scss", "src/scss/*.scss"],
      ["slm", "src/slm/*.slm"],
      ["yaml", "src/yaml/*.yaml"],
    ]),
  ],
  [
    "dest",
    new Map([
      ["css", "public"],
      ["html", "public"],
    ]),
  ],
]);

css = () => {
  return src(config.get("src").get("scss"))
    .pipe(sass(config.get("sass").get("options")))
    .pipe(concat("app.min.css"))
    .pipe(csso())
    .pipe(dest(config.get("dest").get("css")));
};

html = () => {
  let data = yaml.load(fs.readFileSync(config.get("data").get("path"), "utf8"));

  data.copyright = new Date().getFullYear();

  return src(config.get("src").get("slm"))
    .pipe(slm({ locals: data }))
    .pipe(dest(config.get("dest").get("html")));
};

preview = () => {
  watch(config.get("src").get("scss"), css);
  watch([config.get("src").get("slm"), config.get("src").get("yaml")], html);
};

server = () => {
  connect.server({
    livereload: true,
    root: "public",
  });
};

exports.css = css;
exports.html = html;

exports.default = parallel(css, html);
exports.preview = parallel(preview, server);
