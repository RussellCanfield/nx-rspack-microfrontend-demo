import { ProductsOnSale } from "../../Products";
import styles from "./Home.module.css";
import useScreenSize from "../../Products/hooks/useScreenSize";
import { Suspense } from "react";
import React from "react";

const ProductHero = React.lazy(() => import("products/ProductHero"));

const bodyElement = document.querySelector("body")!;

const Home = () => {
	const { isSmallScreen } = useScreenSize({
		htmlElement: bodyElement,
	});

	return (
		<section className={styles["home"]}>
			<Suspense>{!isSmallScreen && <ProductHero />}</Suspense>
			<ProductsOnSale />
		</section>
	);
};

export default Home;
