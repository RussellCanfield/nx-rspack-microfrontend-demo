// @ts-check

/**
 * @type {import('@nrwl/devkit').ModuleFederationConfig}
 **/
module.exports = {
  name: 'mfe-monorepo',
  remotes: ['hero'],
  exposes: {
    './Navbar': './src/app/Features/Navbar/components/Navbar.tsx',
  },
  shared: (name, config) => {
    return false;
  },
  additionalShared: [
    {
      libraryName: 'react',
      sharedConfig: {
        eager: false,
        singleton: true,
        requiredVersion: '18.2.0',
      },
    },
    {
      libraryName: 'react-dom',
      sharedConfig: {
        eager: false,
        singleton: true,
        requiredVersion: '18.2.0',
      },
    },
    {
      libraryName: 'react/jsx-dev-runtime',
      sharedConfig: {
        eager: false,
        singleton: true,
        requiredVersion: '18.2.0',
      },
    },
  ],
};
