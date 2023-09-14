import { type Product } from "../../../types/Products";
import styles from "./ProductCard.module.css";
import { PropsWithChildren } from "react";

export type ProductCardProps = {
	product: Product;
} & PropsWithChildren;

const ProductCard = ({ product, children }: ProductCardProps) => {
	const formatAsCurrency = (price: number) => {
		return new Intl.NumberFormat(navigator.language, {
			style: "currency",
			currency: "USD",
		}).format(price);
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
				{children}
			</div>
		</div>
	);
};

export default ProductCard;
