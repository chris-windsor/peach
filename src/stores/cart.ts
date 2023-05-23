import { type Writable, writable } from 'svelte/store';
import { persist, createSessionStorage } from '@macfja/svelte-persistent-store';

type Product = {
	id: string;
	name: string;
	description: string;
	img: string;
	color: string;
	size: string;
	price: number;
	inStock: boolean;
	leadTime: string;
	cartId: string;
};

type Cart = Writable<{
	items: Product[];
	selectedShippingMethod: any;
}>;

export const cart: Cart = persist(
	writable({
		items: [],
		selectedShippingMethod: {}
	}),
	createSessionStorage(),
	'cart'
);

export const addProductToCart = (product: Product) => {
	const cartId = crypto.randomUUID();

	cart.update((cart) => {
		return {
			...cart,
			items: cart.items.concat({
				...product,
				cartId
			})
		};
	});
};

export const removeProductFromCart = (cartId: string) => {
	cart.update((cart) => {
		return {
			...cart,
			items: cart.items.filter((product) => product.cartId !== cartId)
		};
	});
};

export const setSelectedShippingMethod = (newMethod: any) => {
	cart.update((cart) => {
		return {
			...cart,
			selectedShippingMethod: newMethod
		};
	});
};
