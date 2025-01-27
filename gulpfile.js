process.env.SASS_PATH = "./node_modules";

const { src, dest, parallel, watch } = require("gulp");
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const csso = require("gulp-csso");
const fs = require("fs");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const slm = require("gulp-slm");
const yaml = require("js-yaml");

const config = new Map([
  [
    "data",
    new Map([
      ["en", "src/yaml/en.yaml"],
      ["ja", "src/yaml/ja.yaml"],
    ]),
  ],
  [
    "src",
    new Map([
      ["scss", "src/scss/*.scss"],
      ["slm_index", "src/slm/index.slm"],
      ["slm_page", "src/slm/page.slm"],
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
    .pipe(sass())
    .pipe(concat("app.min.css"))
    .pipe(csso())
    .pipe(dest(config.get("dest").get("css")));
};

html_index = () => {
  let data = {
    copyright: new Date().getFullYear(),
    en: yaml.load(fs.readFileSync(config.get("data").get("en"), "utf8")),
    ja: yaml.load(fs.readFileSync(config.get("data").get("ja"), "utf8")),
  };

  return src(config.get("src").get("slm_index"))
    .pipe(slm({ locals: data }))
    .pipe(dest(config.get("dest").get("html")));
};

html_page_en = () => {
  let data = yaml.load(fs.readFileSync(config.get("data").get("en"), "utf8"));

  data.copyright = new Date().getFullYear();

  return src(config.get("src").get("slm_page"))
    .pipe(slm({ locals: data }))
    .pipe(rename("en.html"))
    .pipe(dest(config.get("dest").get("html")));
};

html_page_ja = () => {
  let data = yaml.load(fs.readFileSync(config.get("data").get("ja"), "utf8"));

  data.copyright = new Date().getFullYear();

  return src(config.get("src").get("slm_page"))
    .pipe(slm({ locals: data }))
    .pipe(rename("ja.html"))
    .pipe(dest(config.get("dest").get("html")));
};

preview = () => {
  watch(config.get("src").get("scss"), css);
  watch(config.get("src").get("slm_index"), html_index);
  watch(
    [config.get("src").get("slm_page"), config.get("src").get("yaml")],
    parallel(html_page_en, html_page_ja)
  );
};

server = () => {
  connect.server({
    livereload: true,
    root: "public",
  });
};

exports.css = css;
exports.html = parallel(html_index, html_page_en, html_page_ja);

exports.default = parallel(css, html_index, html_page_en, html_page_ja);
exports.preview = parallel(preview, server);
