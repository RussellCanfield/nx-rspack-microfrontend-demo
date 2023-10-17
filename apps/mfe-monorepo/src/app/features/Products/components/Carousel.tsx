import styles from './Carousel.module.css';
import { ProductSaleData } from '../../../data/ProductData';
import ProductCard from './ProductCard';
import { useCartQuery, useProducts } from '@mfe-monorepo/shared-state';

const ProductCarousel = () => {
  //const { store, addProduct } = useGlobalSync();

  const test = useProducts();
  const query = useCartQuery();

  console.log(query.data);

  return (
    <ul className={styles['product-carousel']}>
      {ProductSaleData.map((product) => (
        <li key={product.id} className={styles['product-carousel__item']}>
          <ProductCard product={product}>
            <button
              type="button"
              onClick={() => {
                test.mutate(product);
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
