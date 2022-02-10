import React, { createContext, useContext, useReducer } from 'react';
import { ItemType } from '../types/ItemType';

const initialState = { total: 0 };

// type ActionsType =
// | {type: 'ADD_TO_CART'; payload: ItemType }
// | {type: 'REMOVE_FROM_CART'; payload: number }

type ActionsType = 'ADD_TO_CART' | 'REMOVE_FROM_CART';
export type Dispatch = (action: ActionsType) => void;
export type State = typeof initialState;

const CartContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

const cartReducer = (state: State, action: ActionsType) => {
	switch (action) {
		case 'ADD_TO_CART': {
			return { total: state.total + 1 };
		}

		case 'REMOVE_FROM_CART': {
			return { total: state.total - 1 };
		}
	}
};

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

// import React, { createContext, useContext, useReducer } from 'react';

// export type CartItemType = {
// 	id: number;
// 	category: string;
// 	description: string;
// 	image: string;
// 	price: number;
// 	title: string;
// 	amount: number;
// };

// const initialState = {
// 	items: [],
// 	addToCart: () => {},
// 	// removeFromCart: () => {},
// };

// type ActionType = { type: 'ADD_TO_CART'; item: CartItemType } | { type: 'REMOVE_FROM_CART'; id: number };
// type State = CartItemType[];

// const CartContext = createContext(initialState);

// const cartReducer = (state: State, action: ActionType) => {
// 	switch(action.type) {
// 		case 'ADD_TO_CART':
// 			// const isItemInCart = state.find((item) => item.id === action.);
// 			return {
// 				items: [...state, action]
// 			}
// 		// case 'REMOVE_FROM_CART':
// 		// 	return {}
// 		default:
// 		return {}
// 	}
// }

// export const CartContextProvider = ({ children }: {children: React.ReactNode}) => {
// 	const [state, dispatch] = useReducer(cartReducer, initialState)

// 	return (
// 		<CartContext.Provider value={{state, dispatch}}>
// 			{children}
// 		</CartContext.Provider>
// 	)
// }
