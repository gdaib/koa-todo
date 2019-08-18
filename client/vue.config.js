module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("vue$", "vue/dist/vue.esm.js");
  },

  devServer: {
    proxy: "http://localhost:3000"
  }
};
