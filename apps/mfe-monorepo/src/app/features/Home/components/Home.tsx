import { ProductsOnSale } from '../../Products';
import styles from './Home.module.css';
import useScreenSize from '../../Products/hooks/useScreenSize';
import { Suspense, lazy } from 'react';
import { loadRemote } from '@module-federation/enhanced/runtime';
import ProductHero from 'hero/ProductHero';

const Hero = lazy(() => {
  return loadRemote<{ default: typeof ProductHero }>('hero/ProductHero', {
    from: 'runtime',
  }) as Promise<{ default: typeof ProductHero }>;
});
const bodyElement = document.querySelector('body')!;

const Home = () => {
  const { isSmallScreen } = useScreenSize({
    htmlElement: bodyElement,
  });

  return (
    <section className={styles['home']}>
      <Suspense>{!isSmallScreen && <Hero label={'!23'} />}</Suspense>
      <ProductsOnSale />
    </section>
  );
};

export default Home;
