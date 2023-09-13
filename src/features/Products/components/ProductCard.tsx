import { type Product } from "../../../types/Products";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }: { product: Product }) => {
	return (
		<div className={styles["product-card"]}>
			<h3>{product.title}</h3>
			<img
				src={product.imgUrl}
				alt={product.title}
				className={styles["product-card__image"]}
			/>
			<h4>{product.price}</h4>
		</div>
	);
};

export default ProductCard;
