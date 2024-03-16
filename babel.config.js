module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['react-native-reanimated/plugin'],
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
          '@assets': './assets',
          '@components': './src/components',
          '@config': './src/config',
          '@forms': './src/forms',
          '@fragments': './src/fragments',
          '@screens/*': ['./src/screens/*'],
          '@services': './src/services',
          '@theme': './src/theme',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
