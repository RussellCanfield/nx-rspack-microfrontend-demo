import { ProductsOnSale } from "../../Products";
import styles from "./Home.module.css";
import useScreenSize from "../../Products/hooks/useScreenSize";
import { ComponentType, Suspense } from "react";
import React from "react";
import { loadRemote } from "@module-federation/runtime";

const ProductHero = React.lazy(() => {
	const promise = loadRemote("products/ProductHero");
	return promise as Promise<{ default: ComponentType<any> }>;
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
