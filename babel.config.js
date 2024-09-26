module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    // This enables support for decorators in JavaScript, beocz javascript cant use decorators directly in vue 3
    ["@babel/plugin-proposal-decorators", { "version": "legacy" }],
  ]
};
