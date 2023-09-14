import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import styles from "./ProductSearch.module.css";
import { searchTextAtom } from "../store";
import { useAtom } from "jotai";

const ProductSearch = () => {
	const [searchText, setSearchText] = useAtom(searchTextAtom);

	return (
		<div className={styles["product-search"]}>
			<div className={styles["product-search__wrapper"]}>
				<input
					type="text"
					className={styles["product-search__wrapper__input"]}
					placeholder="Search Products"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
				<MagnifyingGlassIcon
					className={styles["product-search__wrapper__icon"]}
				/>
			</div>
		</div>
	);
};

export default ProductSearch;
