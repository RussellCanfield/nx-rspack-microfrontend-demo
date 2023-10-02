import { ProductsOnSale } from '../../Products';
import styles from './Home.module.css';
import useScreenSize from '../../Products/hooks/useScreenSize';
import { Suspense, lazy } from 'react';

// const ProductHero = lazy(() =>
//   importRemote({
//     url: 'http://localhost:3001',
//     scope: 'hero',
//     module: './ProductHero',
//     remoteEntryFileName: 'remoteEntry.js',
//     esm: true,
//   })
// );

const ProductHero = lazy(() => import('hero/ProductHero'));

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
