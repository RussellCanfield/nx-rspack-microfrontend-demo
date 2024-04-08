import { ProductsOnSale } from '../../Products';
import styles from './Home.module.css';
import useScreenSize from '../../Products/hooks/useScreenSize';
import { Suspense, lazy } from 'react';

const ProductHero = lazy(() => import('hero/ProductHero'));
const bodyElement = document.querySelector('body')!;

const Home = () => {
  const { isSmallScreen } = useScreenSize({
    htmlElement: bodyElement,
  });

  return (
    <section className={styles['home']}>
      <Suspense>{!isSmallScreen && <ProductHero label={'!23'} />}</Suspense>
      <ProductsOnSale />
    </section>
  );
};

export default Home;
