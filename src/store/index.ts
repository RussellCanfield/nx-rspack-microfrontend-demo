import { atom } from "jotai";
import { Cart } from "../types/Cart";

const cartAtom = atom<Cart>({
	products: [],
});

export { cartAtom };
