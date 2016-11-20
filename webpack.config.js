module.exports = {
  entry: [
    './src', //this is where our app lives
  ],
  output: {
    path: 'build',
    publicPath: 'build/',
    filename: 'bundle.js',
    // outputs everything to build/bundle.js
  },
};
