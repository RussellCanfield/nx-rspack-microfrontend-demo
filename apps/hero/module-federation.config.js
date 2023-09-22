// @ts-check
/**
 * @type {import('@nrwl/devkit').ModuleFederationConfig}
 **/
module.exports = {
  name: 'hero',
  exposes: {
    './ProductHero': './src/features/Products/components/ProductHero.tsx',
  },
};
