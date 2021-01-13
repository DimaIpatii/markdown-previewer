module.exports = {
    plugins: [
      require("autoprefixer")({
        grid: "autoplace",
      }),
      require("node-css-mqpacker")({
        sort: "auto",
      }),
      require("cssnano")({
        preset: ["default", {discardComments: {removeAll: true}}],
      }),
    ],
  };
  