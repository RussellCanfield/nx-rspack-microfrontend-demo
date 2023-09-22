import { useAtom } from "jotai";
import { searchTextAtom } from "../store";
import ProductData from "../../../data/ProductData";
import ProductCard from "./ProductCard";
import styles from "./ProductSearchResults.module.css";
import { useCart } from "../../../hooks";

const ProductSearchResults = () => {
	const [searchText] = useAtom(searchTextAtom);
	const { addToCart } = useCart();

	const filteredProducts = ProductData.filter((product) =>
		product.title.toLowerCase().includes(searchText.toLowerCase())
	);

	return (
		<section className={styles["product-search"]}>
			<h3>Search Results:</h3>
			<div className={styles["product-search-results"]}>
				{filteredProducts.map((product) => (
					<ProductCard key={product.id} product={product}>
						<button
							type="button"
							role="button"
							onClick={() => addToCart(product)}
						>
							Add to Cart
						</button>
					</ProductCard>
				))}
			</div>
		</section>
	);
};

export default ProductSearchResults;
