import {
  useCartQuery,
  useGlobalSync,
  useProducts,
  CartDataProvider,
} from '@mfe-monorepo/shared-state';
import styles from './ProductHero.module.css';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const RemoteWrapper = () => {
  //const { store } = useGlobalSync();

  return (
    <CartDataProvider>
      <ProductHero />
    </CartDataProvider>
  );
};

const ProductHero = () => {
  //const [products, setProducts] = useState([]);
  //const { store, addProduct } = useGlobalSync();

  const query = useCartQuery();
  const test = useProducts();

  //console.log(query.data);

  console.log(query.data);

  return (
    <section className={styles['product-hero']} id="product-hero">
      <div className={styles['product-hero__wrapper']}>
        <div className={styles['product-hero__wrapper__text__container']}>
          <p>The only shirt you'll ever need.</p>
          <p
            className={
              styles['product-hero__wrapper__text__container__caption']
            }
          >
            Unless, you know, it isn't. {query.data?.length}
            <button
              type="button"
              onClick={() => {
                test.mutate({ id: new Date().getTime(), name: 'test' });
              }}
            >
              Test
            </button>
          </p>
        </div>
        <img
          src="./assets/NatureHero.png"
          alt="Nature"
          className={styles['product-hero__wrapper__image']}
        />
        <img
          src="./assets/WhiteShirt.png"
          alt="White T-shirt"
          className={styles['product-hero__wrapper__image__shirt']}
        />
      </div>
    </section>
  );
};

export default RemoteWrapper;
