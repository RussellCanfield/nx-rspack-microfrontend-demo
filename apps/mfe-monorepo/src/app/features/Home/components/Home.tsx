import { ProductsOnSale } from '../../Products';
import styles from './Home.module.css';
import useScreenSize from '../../Products/hooks/useScreenSize';
import { Suspense, lazy, useState } from 'react';
import {
  loadRemote,
  registerRemotes,
} from '@module-federation/enhanced/runtime';
import type ProductHero from 'hero/ProductHero';
import { ErrorBoundary } from 'react-error-boundary';
const bodyElement = document.querySelector('body')!;

// const Hero = lazy(() => {
//   return loadRemote<{ default: typeof ProductHero }>('hero/ProductHero', {
//     from: 'runtime',
//   }) as Promise<{ default: typeof ProductHero }>;
// });

interface UserClaims {
  userId: number;
}

const useRemote = (scope: string, module: string, claims: UserClaims) => {
  const LazyComponent = lazy(async () => {
    registerRemotes([
      {
        name: scope,
        alias: scope,
        entry: 'http://localhost:3001/remoteEntry.js',
      },
    ]);

    return loadRemote<{ default: typeof ProductHero }>(`${scope}/${module}`, {
      from: 'runtime',
    }) as Promise<{ default: typeof ProductHero }>;
  });

  return (props: any) => {
    return (
      <ErrorBoundary fallback={<p>ut oh!!</p>}>
        <LazyComponent {...props} />
      </ErrorBoundary>
    );
  };
};

const Home = () => {
  const [userId] = useState(123);
  const { isSmallScreen } = useScreenSize({
    htmlElement: bodyElement,
  });

  const Hero = useRemote('hero', 'ProductHero', {
    userId,
  });

  return (
    <section className={styles['home']}>
      <Suspense>{!isSmallScreen && <Hero label={'444'} />}</Suspense>
      <ProductsOnSale />
    </section>
  );
};

export default Home;
