const path = require('path');

module.exports = {
  entry: './src/index.js', // Replace with your entry file path
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Replace with your output directory path
  },
  module: {
    rules: [
      {
        test: /\.glb$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
      {
        test: /\.glb$/,
        use: [
          {
            loader: 'glb-loader',
          },
        ],
      },
      {
        test: /\.(glb|gltf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/models/', // Change the output path as needed
            },
          },
        ],
      },
    ],
  },
  // Other webpack configuration options...
};
