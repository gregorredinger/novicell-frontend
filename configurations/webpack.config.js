// Node packages
const glob = require('glob');
const path = require('path');

// plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Project options
const options = require('../config');
const rootFolder = options.root_folder;
const moduleDir = options.mainSettings.modulesDir;
const env = process.env.NODE_ENV || 'development';
const scriptsDistFolderName = '/scripts';
const cssDistFolderName = '/css';

// Find all files JS from modules directory
let filesInModulesDir = glob.sync(moduleDir);
const allEntries = () => {
    manyEntries = {
        app: options.mainSettings.appGlobalFile,
    };
    for (var index in filesInModulesDir) {
        manyEntries[path.basename(filesInModulesDir[index], '.js')] = filesInModulesDir[index]
    }
    if (filesInModulesDir.length > 0) {
        return manyEntries;
    } else {
        console.log('- - - - - No files to bundle!!!');
        return;
    }
}

module.exports = {
    mode: env,
    watch: false,
    entry: allEntries(),
    output: {
        path: options.mainSettings.dist + scriptsDistFolderName,
        filename: '[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial'
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        },
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    ecma: 8,
                    mangle: false,
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            logLevel: 'silent',
            analyzerMode: 'static',
            openAnalyzer: false
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
          vue: 'vue/dist/vue.js',
        }
    },
    module: {
        rules: [{
                // enfore ensures that eslint-loader runs before babel or any other loaders
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                    failonError: false,
                    fix: true,
                    configFile: path.resolve(options.fullConfigsPath, '.eslintrc'),
                }
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader, // creates style nodes from JS strings
                    options: {
                        publicPah: options.mainSettings.dist + cssDistFolderName
                    }
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "postcss-loader", // compiles Sass to CSS
                    options: {
                        config: {
                            path: path.resolve(rootFolder, options.configPath)
                        }
                    }
                }]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cwd: path.join(rootFolder, options.configPath),
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    }
};