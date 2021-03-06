const fs = require('fs');
const { DateTime } = require('luxon');

module.exports = function(eleventyConfig) {
    // Copy files
    eleventyConfig.addPassthroughCopy({
        'src/css': 'static/css',
        'src/js': 'static/js',
        'src/images': 'static/images'
    });

    // Filters
    eleventyConfig.addLiquidFilter('asset_url', (value) => `/static/${value}`);
    eleventyConfig.addLiquidFilter('image_url', (value) => `/static/images/${value}`);

    // Shortcodes
    eleventyConfig.addShortcode('year', () => DateTime.fromJSDate(new Date(), {zone: 'utc'}).toFormat('yyyy'));

    // Enable 404 errors in development
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, browserSync) {
                const content_404 = fs.readFileSync('dist/404.html');
        
                browserSync.addMiddleware('*', (req, res) => {
                    res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'});
                    res.write(content_404);
                    res.end();
                });
            },
        },
        ui: false,
        ghostMode: false,
        open: true,
    });

    // Directories
    return {
        dir: {
            input: './src',
            data: './data',
            includes: './includes',
            layouts: './layouts',
            output: './dist'
        }
    }
}