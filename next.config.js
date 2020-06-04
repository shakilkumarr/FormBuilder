const withFonts = require('next-fonts');

module.exports = withFonts({
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/HomePage' },
      '/home': { page: '/HomePage' },
    }
  },
});
