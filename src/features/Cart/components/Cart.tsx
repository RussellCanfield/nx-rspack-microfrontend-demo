import { ProductCard } from "../../Products";
import styles from "./Cart.module.css";
import useCart from "../hooks/useCart";

const Cart = () => {
	const { cart, removeFromCart } = useCart();

	const total = cart.products.reduce((acc, product) => {
		return acc + product.price;
	}, 0);

	if (!cart.products.length) {
		return <h3>Sorry your cart is currently empty.</h3>;
	}

	return (
		<div className={styles["cart"]}>
			<section>
				<h1>Cart</h1>
				<ul>
					{cart.products.map((product) => (
						<ProductCard key={product.id} product={product}>
							<button
								type="button"
								role="button"
								onClick={() => removeFromCart(product.id)}
							>
								Remove from Cart
							</button>
						</ProductCard>
					))}
				</ul>
			</section>
			{cart.products.length > 0 && (
				<section className={styles["cart__summary"]}>
					<div>
						<h2>Summary</h2>
						<ul>
							<li>
								<span style={{ paddingRight: "1rem" }}>
									Total...
								</span>
								<span>${total}</span>
							</li>
						</ul>
					</div>
				</section>
			)}
		</div>
	);
};

export default Cart;
