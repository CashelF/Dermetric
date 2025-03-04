const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// Customize the webpack config to load CSS files
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Add CSS loader for .css files
  config.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  });

  return config;
};