import styles from './Carousel.module.css';
import { ProductSaleData } from '../../../data/ProductData';
import ProductCard from './ProductCard';
import {
  useGlobalSync,
  useCartQuery,
  useProducts,
} from '@mfe-monorepo/shared-state';
import { useContext } from 'react';
import { ProductContext } from '../../../App';

const ProductCarousel = () => {
  const { store, addProduct } = useGlobalSync();

  const test = useProducts();

  const query = useCartQuery();

  const productcontext = useContext(ProductContext);

  console.log(productcontext.products);

  return (
    <ul className={styles['product-carousel']}>
      {ProductSaleData.map((product) => (
        <li key={product.id} className={styles['product-carousel__item']}>
          <ProductCard product={product}>
            <button
              type="button"
              onClick={() => {
                addProduct(product);
                //test.mutate();
              }}
            >
              Add to Cart
            </button>
          </ProductCard>
        </li>
      ))}
    </ul>
  );
};

export default ProductCarousel;
