import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import Item from '../components/item/Item';
import Header from '../components/Header';
import Cart from '../components/cart/Cart';

export type CartItemType = {
	id: number;
	category: string;
	description: string;
	image: string;
	price: number;
	title: string;
	amount: number;
};

const getProducts = async () => {
	const URL = 'https://fakestoreapi.com/products';

	const response = await fetch(URL);

	if (!response.ok) {
		throw new Error('Error Fetching Data!');
	}

	return await response.json();
};

const Home: NextPage = () => {
	const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
	const [cartItems, setCartItems] = useState([] as CartItemType[]);

	const { data, isLoading, isError } = useQuery('products', getProducts);

	const totalItems = cartItems.reduce((acc: number, item) => acc + item.amount, 0);

	const handleAddToCart = (chosenItem: CartItemType) => {
		setCartItems((prevItem) => {
			const isItemInCart = prevItem.find((item) => item.id === chosenItem.id);
			if (isItemInCart) {
				return prevItem.map((item) =>
					item.id === chosenItem.id ? { ...item, amount: item.amount + 1 } : item
				);
			}
			return [...prevItem, { ...chosenItem, amount: 1 }];
		});
	};

	const handleRemoveFromCart = (id: number) => {
		setCartItems((prevItem) =>
			prevItem.reduce((acc, item) => {
				if (item.id === id) {
					if (item.amount === 1) return acc;

					return [...acc, { ...item, amount: item.amount - 1 }];
				} else {
					return [...acc, item];
				}
			}, [] as CartItemType[])
		);
	};

	const openCartHandler = () => {
		setIsCartOpen(!isCartOpen);
	};

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <div>Something went wrong!</div>;

	return (
		<>
			<Head>
				<title>Shopping Cart</title>
				<meta name='description' content='We have anything you are looking for...' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header openCartHandler={openCartHandler} totalItems={totalItems} />
			<main className='layout'>
				<Cart
					cartItems={cartItems}
					addToCart={handleAddToCart}
					removeFromCart={handleRemoveFromCart}
					openCartHandler={openCartHandler}
					totalItems={totalItems}
					isCartOpen={isCartOpen}
				/>

				<div className='grid gap-4  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto'>
					{data?.map((item: CartItemType) => (
						<Item key={item.id} item={item} handleAddToCart={handleAddToCart} />
					))}
				</div>
			</main>
		</>
	);
};

export default Home;
