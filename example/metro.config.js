const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const libraryRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Watch the library source folder (only src, not the whole library)
config.watchFolders = [path.resolve(libraryRoot, 'src')];

// Make Metro resolve packages from example's node_modules first
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
];

// Ensure all peer dependencies resolve to example's node_modules
// This is critical for native modules to work correctly
config.resolver.extraNodeModules = new Proxy(
  {},
  {
    get: (target, name) => {
      // First try to resolve from example's node_modules
      const examplePath = path.resolve(projectRoot, 'node_modules', name);
      try {
        require.resolve(examplePath);
        return examplePath;
      } catch (e) {
        // Fall back to library's node_modules
        return path.resolve(libraryRoot, 'node_modules', name);
      }
    },
  }
);

module.exports = config;

