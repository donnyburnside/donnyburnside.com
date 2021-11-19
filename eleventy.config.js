const fs = require('fs');

module.exports = function(eleventyConfig) {
    // Enable deep merge
    // https://www.11ty.dev/docs/data-deep-merge/
    eleventyConfig.setDataDeepMerge(true);

    // Filters
    eleventyConfig.addLiquidFilter('asset_url', (value) => `/static/${value}`);

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
        ghostMode: false
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