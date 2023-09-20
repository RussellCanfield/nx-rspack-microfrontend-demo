import styles from "./Carousel.module.css";
import { ProductSaleData } from "../../../data/ProductData";
import ProductCard from "./ProductCard";
import { useCart } from "../../../hooks";

const ProductCarousel = () => {
	const { addToCart } = useCart();

	return (
		<ul className={styles["product-carousel"]}>
			{ProductSaleData.map((product) => (
				<li
					key={product.id}
					className={styles["product-carousel__item"]}
				>
					<ProductCard product={product}>
						<button
							type="button"
							role="button"
							onClick={() => addToCart(product)}
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
