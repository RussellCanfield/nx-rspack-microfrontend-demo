import { createRoot } from 'react-dom/client';
import { ProductHero } from './features/Products';

const appElement = document.getElementById('app');

const root = createRoot(appElement!);
root.render(
  <div>
    <ProductHero />
  </div>
);
