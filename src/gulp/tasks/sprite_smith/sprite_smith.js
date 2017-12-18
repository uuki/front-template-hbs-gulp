const spritesmith = require('gulp.spritesmith');

module.exports = (gulp, PATH, $) => {

  let desktop = gulp.src(`${ PATH.src.img }/sprite/*.png`)
                  .pipe(spritesmith({
                    imgName: 'spritesheet.png',
                    cssName: `_sprites.scss`,
                    imgPath: `${ PATH.output.img }/spritesheet.png`,
                    padding: 20
                  }));
  let mobile = gulp.src(`${ PATH.src.img }/sprite/mobile/*.png`)
                .pipe(spritesmith({
                  imgName: 'spritesheet.mobile.png',
                  cssName: '_sprites.mobile.scss',
                  imgPath: `${ PATH.output.img }/spritesheet.mobile.png`,
                  padding: 40
                }));

  return () => {
    desktop.img.pipe(gulp.dest(`${ PATH.dist }${ PATH.output.img }/`));
    desktop.css.pipe(gulp.dest(`${ PATH.src.scss }/`));
    mobile.img.pipe(gulp.dest(`${ PATH.dist }${ PATH.output.img }/`));
    mobile.css.pipe(gulp.dest(`${ PATH.src.scss }/`));
  }
}