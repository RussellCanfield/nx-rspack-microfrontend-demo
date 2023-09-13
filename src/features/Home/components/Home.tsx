import { Navbar } from "../../Navbar";
import { ProductSearch, ProductsOnSale } from "../../Products";
import styles from "./Home.module.css";

const Home = () => {
	return (
		<section className={styles["home"]}>
			<Navbar />
			<ProductSearch />
			<ProductsOnSale />
		</section>
	);
};

export default Home;
