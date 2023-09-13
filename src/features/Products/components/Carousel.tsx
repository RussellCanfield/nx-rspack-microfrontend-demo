import styles from "./Carousel.module.css";
import { ProductSaleData } from "../../../data/ProductData";
import ProductCard from "./ProductCard";

const ProductCarousel = () => {
	return (
		<ul className={styles["product-carousel"]}>
			{ProductSaleData.map((product) => (
				<li
					key={product.id}
					className={styles["product-carousel__item"]}
				>
					<ProductCard product={product} />
				</li>
			))}
		</ul>
	);
};

export default ProductCarousel;
