// @ts-check

/**
 * @type {import('@nrwl/devkit').ModuleFederationConfig}
 **/
module.exports = {
  name: 'hero',
  filename: 'remoteEntry.js',
  exposes: {
    './ProductHero': './src/features/Products/components/ProductHero.tsx',
  },
};
