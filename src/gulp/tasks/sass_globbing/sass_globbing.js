const sassGlobbing = require('gulp-sass-globbing');

module.exports = (gulp, PATH, $) => {

  let files = [
        'foundations',
        'layouts',
        'mixins',
        'objects/components',
        'objects/projects',
        'utils',
        'variables'
      ];

  let globbing = (files) => {
    files.forEach(f => {
      gulp.src(`${f}/*.scss`, {cwd: `${ PATH.src.scss }/`})
        .pipe(sassGlobbing(
          {
            path: `_${f}.scss`
          },
          {
            useSingleQuotes: true,
            signature: '/* generated with gulp-sass-globbing */'
          }
        ))
        //.pipe($.sass())
        .pipe(gulp.dest(`${ PATH.src.scss }/generated/`))
    });
  };

  return () => {
    globbing(files);
  }
}