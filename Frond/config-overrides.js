const webpack = require('webpack');

       module.exports = function override(config) {
         const fallback = config.resolve.fallback || {};
         Object.assign(fallback, {
           "http": require.resolve("stream-http"),
           "https": false,
           "util": require.resolve("util/"),
           "zlib": require.resolve("browserify-zlib"),
           "stream": require.resolve("stream-browserify")
         });
         config.resolve.fallback = fallback;
         config.plugins = (config.plugins || []).concat([
           new webpack.ProvidePlugin({
             process: 'process/browser',
             Buffer: ['buffer', 'Buffer']
           })
         ]);
         return config;
       };