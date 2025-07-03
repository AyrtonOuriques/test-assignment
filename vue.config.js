const { defineConfig } = require('@vue/cli-service');
const Critters = require('critters-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new Critters({
          preload: 'swap',
        })
      );
    }
  }
});