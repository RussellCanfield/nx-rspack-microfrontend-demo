import { useAtom } from "jotai";
import { cartAtom } from "../../../store";

const Cart = () => {
	const [cart] = useAtom(cartAtom);

	return (
		<section>
			<h1>Cart</h1>
			<ul>
				{cart.products.map((product) => (
					<li key={product.id}>{product.title}</li>
				))}
			</ul>
		</section>
	);
};

export default Cart;
