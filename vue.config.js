const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    // This will automatically handle the feature flags
    plugins: [
        new (require('webpack')).DefinePlugin({
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
        }),
        new MonacoWebpackPlugin({
            languages: ['java'],
        }),
    ],
},
});
