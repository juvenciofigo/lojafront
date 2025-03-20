const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin"); // Adicione esta linha

module.exports = defineConfig({
    transpileDependencies: true,

    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
            }),
            require("unplugin-vue-components/webpack").default({
                /* options */
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        // Adicione esta seção para minificação e ofuscação
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true, // Remove console.log em produção
                        },
                        output: {
                            comments: false, // Remove comentários
                        },
                    },
                }),
            ],
        },
    },

    chainWebpack: (config) => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .loader("vue-loader")
            .tap((options) => {
                options.compilerOptions = {
                    // Adicione as opções necessárias aqui
                    isCustomElement: (tag) => tag.startsWith("custom-"),
                };
                return options;
            });
    },

    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        },
    },
});
