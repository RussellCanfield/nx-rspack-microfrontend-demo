import { useAtom } from "jotai";
import { type Product } from "../../../types/Products";
import styles from "./ProductCard.module.css";
import { cartAtom } from "../../../store";

const ProductCard = ({ product }: { product: Product }) => {
	const [, setCart] = useAtom(cartAtom);

	const formatAsCurrency = (price: number) => {
		return new Intl.NumberFormat(navigator.language, {
			style: "currency",
			currency: "USD",
		}).format(price);
	};

	const addToCart = () => {
		setCart((cart) => {
			cart.products.push(product);
			return cart;
		});
	};

	return (
		<div className={styles["product-card"]}>
			<h3>{product.title}</h3>
			<img
				src={product.imgUrl}
				alt={product.title}
				className={styles["product-card__image"]}
			/>
			<div className={styles["product-card__details"]}>
				<p className={styles["product-card__details__price"]}>
					{formatAsCurrency(product.price)}
				</p>
				<button type="button" role="button" onClick={addToCart}>
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
