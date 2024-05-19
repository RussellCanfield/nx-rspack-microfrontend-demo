import { createRoot } from 'react-dom/client';
import App from './app/App';
import './index.css';
import { init, preloadRemote } from '@module-federation/enhanced/runtime';
import dynamicplugin from './dynamic-loader-plugin';

init({
  name: 'mfe_monorepo',
  remotes: [
    {
      name: 'hero',
      entry: '',
    },
  ],
  plugins: [dynamicplugin()],
});

preloadRemote([
  {
    nameOrAlias: 'hero',
    exposes: ['Widget'],
  },
]);

const appElement = document.getElementById('app');

const root = createRoot(appElement!);
root.render(<App />);
