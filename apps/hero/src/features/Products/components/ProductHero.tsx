import {
  CartDataProvider,
  useCartQuery,
  useGlobalSync,
  useProducts,
} from '@mfe-monorepo/shared-state';
import styles from './ProductHero.module.css';
import { useState, useContext } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const ProductContext = React.createContext<{
  products: unknown[];
}>({
  products: [],
});

const RemoteWrapper = () => {
  const { store } = useGlobalSync();

  return (
    <ProductContext.Provider value={{ products: store.products }}>
      <QueryClientProvider
        //@ts-ignore
        client={window.REACT_QUERY_CLIENT}
        //@ts-ignore
        context={window.REACT_QUERY_CONTEXT}
      >
        <ProductHero />
      </QueryClientProvider>
    </ProductContext.Provider>
  );
};

const ProductHero = () => {
  //const [products, setProducts] = useState([]);
  const { store, addProduct } = useGlobalSync();

  const query = useCartQuery();
  const test = useProducts();

  //console.log(query.data);

  const productcontext = useContext(ProductContext);

  console.log(productcontext.products);

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
            Unless, you know, it isn't. {store.products.length}
            <button
              type="button"
              onClick={() => {
                test.mutate();
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
