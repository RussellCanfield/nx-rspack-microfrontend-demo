import { useLayoutEffect, useState } from "react";
import { ProductHero, ProductsOnSale } from "../../Products";
import styles from "./Home.module.css";

const Home = () => {
	const [smallScreen, setSmallScreen] = useState<Boolean>(false);

	useLayoutEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const onSmallScreenSize =
					entry.contentRect.width < 1024 ? true : false;
				setSmallScreen(onSmallScreenSize);
			}
		});

		resizeObserver.observe(document.querySelector("body")!);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	return (
		<section className={styles["home"]}>
			{!smallScreen && <ProductHero />}
			<ProductsOnSale />
		</section>
	);
};

export default Home;
