/*
 * This example targets Node 4 and up.
 */

const cssnano = require('cssnano');

/*
 * Add your CSS code here.
 */

const css = `
h1 {
    color: #ff0000;
    font-weight: bold;
}
`;

/*
 * Add any PostCSS options here. For example to enable sourcemaps, see:
 * https://github.com/postcss/postcss/blob/master/site/source-maps.md
 *
 * Or for an inline sourcemap, uncomment the options below.
 */

const postcssOpts = {
    // from: 'app.css',
    // to:   'app.min.css',
    // map:  {inline: true},
};

/*
 * Add your choice of preset. Note that for any value other
 * than 'default', you will need to install the appropriate
 * preset separately.
 */

const cssnanoOpts = {
    preset: 'default',
};

/*
 * Compress the CSS asynchronously and log it to the console.
 */

cssnano.process(css, postcssOpts, cssnanoOpts).then(result => {
    console.log(result.css);
});
