const { composePlugins, withNx, withReact } = require('@nx/rspack');

const {
  ModuleFederationPlugin,
} = require('@module-federation/enhanced/rspack');
const mfConfig = require('./module-federation.config');
const path = require('path');

module.exports = composePlugins(withNx(), withReact(), (config, context) => {
  config.context = path.join(context.context.root, 'apps/hero');

  config.plugins.push(new ModuleFederationPlugin({ ...mfConfig }));
  config.output.publicPath = 'auto';
  config.module.parser = {
    'css/module': {
      namedExports: false,
    },
  };

  config.devServer = {
    ...config.devServer,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  };


  return config;
});
