const task = process.env.npm_lifecycle_event;

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs_extra = require("fs-extra");

// "docs" is necessary to ultilize gitHub's free service
const output_path = "docs";

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy assets", function () {
      fs_extra.copySync(
        "./app/assets/images",
        `./${output_path}/assets/images`
      );
    });
  }
}

const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-hexrgba"),
  require("autoprefixer")
];

let cssRule = {
  test: /\.css$/i,
  use: [
    "css-loader?url=false",
    {
      loader: "postcss-loader",
      options: { plugins: postCSSPlugins }
    }
  ]
};

let process_HtmlWebpackPlugin = fs_extra
  // get a list of files in the path
  .readdirSync("./app")
  // filter and get all html file
  .filter(function (file) {
    return file.endsWith(".html");
  })
  // apply HtmlWebpackPlugin for each html file
  .map(function (html_file) {
    return new HtmlWebpackPlugin({
      filename: html_file,
      template: `./app/${html_file}`
    });
  });

let config = {
  entry: "./app/assets/scripts/App.js",
  plugins: process_HtmlWebpackPlugin,
  module: {
    rules: [cssRule]
  }
};

if (task == "dev") {
  cssRule.use.unshift("style-loader");

  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  };

  config.devServer = {
    before: function (app, server) {
      server._watch("./app/**/*.html");
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0"
  };

  config.mode = "development";
} else if (task == "build") {
  cssRule.use.unshift(MiniCssExtractPlugin.loader);
  postCSSPlugins.push(require("cssnano"));

  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"]
      }
    }
  });

  config.output = {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, `${output_path}`)
  };

  config.mode = "production";

  config.optimization = {
    splitChunks: {
      chunks: "all"
    }
  };

  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.[chunkhash].css"
    }),
    new RunAfterCompile()
  );
}

module.exports = config;
