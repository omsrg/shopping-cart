import React, { useCallback, useReducer, createContext, useContext } from 'react';

export type CartItemType = {
	id: number;
	category: string;
	description: string;
	image: string;
	price: number;
	title: string;
	amount: number;
};

type ActionType = { type: 'ADD'; item: CartItemType } | { type: 'REMOVE'; id: number };

type UseCartManagerResult = ReturnType<typeof useCartManager>;

const CartContext = createContext<UseCartManagerResult>({
	cartItems: [],
	totalItems: 0,
	addToCart: () => {},
	removeFromCart: () => {},
});

function useCartManager(initialCart: CartItemType[]): {
	cartItems: CartItemType[];
	totalItems: number;
	addToCart: (item: CartItemType) => void;
	removeFromCart: (id: number) => void;
} {
	const [cartItems, dispatch] = useReducer((state: CartItemType[], action: ActionType) => {
		switch (action.type) {
			case 'ADD':
				const chosenItem = action.item;
				const isItemInCart = state.find((item) => item.id === chosenItem.id);

				if (isItemInCart) {
					return state.map((item) =>
						item.id === chosenItem.id ? { ...item, amount: item.amount + 1 } : item
					);
				}

				return [...state, { ...action.item, amount: 1 }];

			case 'REMOVE':
				const newCart = state.reduce((acc, item) => {
					if (item.id === action.id) {
						if (item.amount === 1) return acc;
						return [...acc, { ...item, amount: item.amount - 1 }];
					} else {
						return [...acc, item];
					}
				}, [] as CartItemType[]);

				return newCart;
			default:
				throw new Error();
		}
	}, initialCart);

	const totalItems = cartItems.reduce((acc: number, item) => acc + item.amount, 0);

	const addToCart = useCallback((item: CartItemType) => {
		dispatch({
			type: 'ADD',
			item,
		});
	}, []);

	const removeFromCart = useCallback((id: number) => {
		dispatch({
			type: 'REMOVE',
			id,
		});
	}, []);

	return { cartItems, addToCart, removeFromCart, totalItems };
}

export const CartContextProvider = ({
	initialCart,
	children,
}: {
	initialCart: CartItemType[];
	children: React.ReactNode;
}) => {
	const value = useCartManager(initialCart);
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartItems = (): CartItemType[] => {
	const { cartItems } = useContext(CartContext);
	return cartItems;
};

export const useAddToCart = (): UseCartManagerResult['addToCart'] => {
	const { addToCart } = useContext(CartContext);
	return addToCart;
};

export const useRemoveFromCart = (): UseCartManagerResult['removeFromCart'] => {
	const { removeFromCart } = useContext(CartContext);
	return removeFromCart;
};

export const useTotalItems = (): number => {
	const { totalItems } = useContext(CartContext);
	return totalItems;
};
