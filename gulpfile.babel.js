import gulp from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import cleanCSS from "gulp-clean-css";
import del from "del";
import browserSync from "browser-sync";
import minify from "gulp-minify";
import rename from "gulp-rename";

const sass = gulpSass(dartSass);
const server = browserSync.create();

const paths = {
    styles: {
        src: ["src/scss/selexion.scss"],
        dest: "dist/css",
    },
    scripts: {
        src: ["src/js/selexion.js"],
        dest: "dist/js",
    },
};

export const serve = (done) => {
    server.init({
        proxy: "http://127.0.0.1:5500/",
    });
    done();
};

export const reload = (done) => {
    server.reload();
    done();
};

export const clean = () => del(["dist"]);

export const styles = () => {
    return gulp
        .src(paths.styles.src)
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
};

export const scripts = () => {
    return gulp
        .src(paths.scripts.src)
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(minify({ ext: { min: ".min.js" }, noSource: true }))
        .pipe(gulp.dest(paths.scripts.dest));
};

export const watch = () => {
    gulp.watch("src/scss/**/*.scss", styles);
    gulp.watch("src/js/**/*.js", gulp.series(scripts, reload));
    gulp.watch("index.html", reload);
};

export const dev = gulp.series(
    clean,
    gulp.parallel(styles, scripts),
    serve,
    watch,
);

export const build = gulp.series(clean, gulp.parallel(styles, scripts));

export const bundle = gulp.series(build);

export default dev;
