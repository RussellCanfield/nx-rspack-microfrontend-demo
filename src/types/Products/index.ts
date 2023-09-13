export enum ProductSize {
	S = "Small",
	M = "Medium",
	L = "Large",
}

export enum ProductColor {
	Black = "Black",
	White = "White",
	Red = "Red",
	Blue = "Blue",
	Grey = "Grey",
}

export type Product = {
	id: string;
	title: string;
	size: ProductSize;
	color: ProductColor;
	price: number;
	imgUrl: string;
};
