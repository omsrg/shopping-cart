import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Item from '../components/item/Item';
import Header from '../components/Header';
import Cart from '../components/cart/Cart';
import { ItemType } from '../types/ItemType';

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
	const { data, isLoading, isError } = useQuery(
		'products',
		getProducts
		// {initialProducts}
	);

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

			<Header openCartHandler={openCartHandler} />
			<main className='layout'>
				<Cart openCartHandler={openCartHandler} isCartOpen={isCartOpen} />

				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto'>
					{data?.map((item: ItemType) => (
						<Item key={item.id} item={item} />
					))}
				</div>
			</main>
		</>
	);
};

export default Home;

// SSR with hydrate
export async function getStaticProps() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery('products', getProducts);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

// SSR with initial Data
// export async function getStaticProps() {
//   const initialProducts = await getProducts();
//   return { props: { initialProducts } };
// }
