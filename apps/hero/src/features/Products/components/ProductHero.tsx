import { useEffect, useState } from 'react';
import styles from './ProductHero.module.css';
import { createWorker } from 'apps/hero/src/utils/createWorker';

declare global {
  const __webpack_public_path__: string;
}

const ProductHero = () => {
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    async function loadWorker() {
      const worker = await createWorker(__webpack_public_path__ + 'worker.js');
      setWorker(worker);
    }

    loadWorker();
  }, []);

  if (!worker) return <></>;

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
            Unless, you know, it isn't.
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
          onClick={() => worker.postMessage('Hello world!')}
          className={styles['product-hero__wrapper__image__shirt']}
        />
      </div>
    </section>
  );
};

export default ProductHero;
