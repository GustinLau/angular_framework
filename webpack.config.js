var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackMd5Hash = require('webpack-md5-hash');

//开发环境OR生产环境
var isDev = /true/.test(process.env.IS_DEV);

//文件生成目录
var buildPath = process.env.BUILD_PATH;

var config = {};

config.entry = {
    index: './src/main/index.js'
};

config.output = {
    path: path.resolve(__dirname, buildPath),
    filename: isDev ? '[name].bundle.js' : 'assets/js/[name].bundle.js?[hash]',
    chunkFilename: isDev ? '[id].bundle.js' : 'assets/js/[id].bundle.js?[hash]',
    publicPath: '/'
};

if (isDev) {
    config.debug = true;
    config.devtool = 'source-map';
}

var loaders = [];
loaders.push({
    test: /\.(min\.css)$/,
    loader: 'file?name=assets/css/[name].[ext]'
});

if (isDev) {
    loaders.push({
        test: /\.(less|(^(min\.)css))$/,
        loader: 'style-loader!css-loader!less-loader'
    })
} else {
    loaders.push({
        test: /\.(less|(^(min\.)css))$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
    });
}

loaders.push({
    test: /\.(min\.js)\w*/,
    loader: 'file?name=assets/js/[name].[ext]'
});
loaders.push({
    test: /\.js\w*/,
    loader: 'ng-annotate!babel?{"presets":["es2015"]}',
    exclude: /(node_modules)/
});

if (isDev) {
    loaders.push({
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file?name=[name].[ext]'
    })
} else {
    loaders.push({
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file?name=assets/res/[name].[ext]'
    });
}

loaders.push({
    test: /\.html$/,
    loader: 'html'
});
loaders.push({
    test: /\.(jpe?g|png|gif)$/i,
    loader: `url?limit=5000&name=assets/img/[name].[ext]?[hash:10]`
});

config.module = {
    loaders: loaders
};

config.resolve = {
    root: [
        path.resolve(__dirname, './'),
        path.resolve(__dirname, 'src/'),
        path.resolve(__dirname, 'src/main/')
    ]
};

config.plugins = [];

if (isDev) {
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin('common.bundle.js'));
} else {
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin('assets/js/common.bundle.js?[hash]'));
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    config.plugins.push(new WebpackMd5Hash());
}

config.plugins.push(new ExtractTextPlugin('assets/css/[name].css?[contenthash:10]'));
config.plugins.push(new HtmlWebpackPlugin({
    pushState: true,
    filename: 'index.html',
    vendors: 'vendors.js',
    inject: 'body',
    template: 'index.html_vm',
    favicon: 'src/assets/img/favicon.ico',
    hash: false,
    css: '<link rel="stylesheet" type="text/css" href="assets/css/splash.min.css">',

    jqueryScript: '<script src="http://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>',

    scripts: ''
}));

config.externals = {};

module.exports = config;