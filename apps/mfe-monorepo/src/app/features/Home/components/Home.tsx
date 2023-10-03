import { ProductsOnSale } from '../../Products';
import styles from './Home.module.css';
import useScreenSize from '../../Products/hooks/useScreenSize';
import { Suspense, lazy } from 'react';
import { importRemote } from '@module-federation/utilities';
import ProductHeroType from 'hero/ProductHero';

const ProductHero = lazy(() =>
  importRemote<{ default: typeof ProductHeroType }>({
    url: async () => Promise.resolve('http://localhost:3001'),
    scope: 'hero',
    module: './ProductHero',
    remoteEntryFileName: 'remoteEntry.js',
    esm: true,
  })
);

const bodyElement = document.querySelector('body')!;

const Home = () => {
  const { isSmallScreen } = useScreenSize({
    htmlElement: bodyElement,
  });

  return (
    <section className={styles['home']}>
      <Suspense>{!isSmallScreen && <ProductHero />}</Suspense>
      <ProductsOnSale />
    </section>
  );
};

export default Home;
