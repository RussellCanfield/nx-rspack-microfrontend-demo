import { ProductsOnSale } from "../../Products";
import styles from "./Home.module.css";
import useScreenSize from "../../Products/hooks/useScreenSize";
import { Suspense } from "react";
import React from "react";
import importDynamicRemote from "../../../utils/importDynamicRemote";

const ProductHero = React.lazy(() => {
	return importDynamicRemote({
		getUrl: () => Promise.resolve("http://localhost:3001/remoteEntry.js"),
		scope: "products",
		module: "./ProductHero",
	});
});

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
