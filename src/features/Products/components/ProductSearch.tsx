import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import styles from "./ProductSearch.module.css";

const ProductSearch = () => {
	return (
		<div className={styles["product-search"]}>
			<div className={styles["product-search__wrapper"]}>
				<input
					type="text"
					className={styles["product-search__wrapper__input"]}
					placeholder="Search Products"
				/>
				<MagnifyingGlassIcon
					className={styles["product-search__wrapper__icon"]}
				/>
			</div>
		</div>
	);
};

export default ProductSearch;
