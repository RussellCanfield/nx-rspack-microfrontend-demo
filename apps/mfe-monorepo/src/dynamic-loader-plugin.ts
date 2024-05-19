import type { FederationRuntimePlugin } from '@module-federation/enhanced/runtime';
import { RemoteWithEntry } from '@module-federation/sdk/.';

const runtimePlugin: () => FederationRuntimePlugin = function () {
  return {
    name: 'my-runtime-plugin',
    async beforePreloadRemote(args) {
      const scope = args.preloadOptions[0].nameOrAlias;

      const remote = args.options.remotes.find(
        (r: RemoteWithEntry) => r.name === scope
      );

      (remote as RemoteWithEntry).entry =
        'http://localhost:3001/mf-manifest.json';

      return args;
    },
    async beforeRequest({ id, options, origin }) {
      const [scope] = id.split('/');

      const remote = origin.options.remotes.find((r) => r.name === scope);

      console.log(remote);

      (remote as RemoteWithEntry).entry =
        'http://localhost:3001/mf-manifest.json';

      return { id, options, origin };
    },
  };
};
export default runtimePlugin;
