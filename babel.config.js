module.exports = {
  presets: [
    ['@babel/env', {
      useBuiltIns: 'entry'}],
    '@babel/react'],
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ]
};
