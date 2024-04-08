// @ts-check

/**
 * @type {import('@nrwl/devkit').ModuleFederationConfig}
 **/
module.exports = {
  name: 'mfe_monorepo',
  remotes: {
    hero: 'hero@http://localhost:3001/remoteEntry.js',
  },
};
