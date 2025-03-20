const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = defineConfig({
    productionSourceMap: false, // Remove os Source Maps (evita que o código original apareça)

    transpileDependencies: true,

    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
            }),
            require("unplugin-vue-components/webpack").default(),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true, // Remove console.log() no ambiente de produção
                            drop_debugger: true, // Remove debugger
                        },
                        output: {
                            comments: false, // Remove comentários no código
                        },
                    },
                }),
            ],
        },
        resolve: {
            alias: {
                "@": require("path").resolve(__dirname, "src"),
            },
        },
    },

    chainWebpack: (config) => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .loader("vue-loader")
            .tap((options) => {
                options.compilerOptions = {
                    isCustomElement: (tag) => tag.startsWith("custom-"),
                };
                return options;
            });
    },

    pluginOptions: {
        vuetify: {},
    },
});
