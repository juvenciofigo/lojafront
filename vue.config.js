const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const path = require('path');  // Import the path module

module.exports = defineConfig({
    transpileDependencies: true,

    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),  // Use path here
            },
        },
    },

    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        },
    },
});
