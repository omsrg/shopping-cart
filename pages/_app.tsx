import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Head>
				<title>Shopping Cart</title>
				<meta name='description' content='Shopping Cart' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}

export default MyApp;
