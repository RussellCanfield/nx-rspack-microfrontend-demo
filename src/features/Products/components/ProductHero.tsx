import styles from "./ProductHero.module.css";

const ProductHero = () => {
	return (
		<section className={styles["product-hero"]} id="product-hero">
			<div className={styles["product-hero__wrapper"]}>
				<div
					className={styles["product-hero__wrapper__text__container"]}
				>
					<p>The only shirt you'll ever need.</p>
					<p
						className={
							styles[
								"product-hero__wrapper__text__container__caption"
							]
						}
					>
						Unless, you know, it isn't.
					</p>
				</div>
				<img
					src="./assets/NatureHero.png"
					alt="Nature"
					className={styles["product-hero__wrapper__image"]}
				/>
				<img
					src="./assets/WhiteShirt.png"
					alt="White T-shirt"
					className={styles["product-hero__wrapper__image__shirt"]}
				/>
			</div>
		</section>
	);
};

export default ProductHero;
