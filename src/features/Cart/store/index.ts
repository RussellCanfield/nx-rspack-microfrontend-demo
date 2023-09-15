import { atom } from "jotai";
import { type Cart } from "../../../types/Cart";

const cartAtom = atom<Cart>({
	products: [],
});

export { cartAtom };
