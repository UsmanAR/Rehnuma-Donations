// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)
  config.resolve.alias['../Utilities/Platform'] =
    'react-native-web/dist/exports/Platform'
  return config
}
module.exports = getDefaultConfig(__dirname);
