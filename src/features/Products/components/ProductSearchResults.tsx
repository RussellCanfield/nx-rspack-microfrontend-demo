import { useAtom } from "jotai";
import { searchTextAtom } from "../store";
import ProductData from "../../../data/ProductData";
import ProductCard from "./ProductCard";
import styles from "./ProductSearchResults.module.css";

const ProductSearchResults = () => {
	const [searchText] = useAtom(searchTextAtom);

	const filteredProducts = ProductData.filter((product) =>
		product.title.toLowerCase().includes(searchText.toLowerCase())
	);

	return (
		<section className={styles["product-search"]}>
			<h3>Search Results:</h3>
			<div className={styles["product-search-results"]}>
				{filteredProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
};

export default ProductSearchResults;
