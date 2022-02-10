import CartItem from '../cart-item/CartItem';
import { ItemType } from '../../types/ItemType';
import { GrClose } from 'react-icons/gr';
import {
	useCartItems,
	useTotalItems,
	useAddToCart,
	useRemoveFromCart,
} from '../../context/CartContext';

type Props = {
	isCartOpen: boolean;
	openCartHandler: () => void;
};

const Cart = ({ isCartOpen, openCartHandler }: Props) => {
	const cartItems = useCartItems();
	const totalItems = useTotalItems();
	const addToCart = useAddToCart();
	const removeFromCart = useRemoveFromCart();

	const calculateTotal = (items: ItemType[]) =>
		items.reduce((acc, item) => acc + item.amount * item.price, 0);

	const closeCart = () => {
		openCartHandler();
	};

	return (
		<>
			<aside
				className={`z-50 fixed h-screen w-5/12 bg-white top-0 right-0 flex flex-col overflow-y-auto transition-all ease-in-out duration-300 ${
					isCartOpen ? 'translate-x-0 ' : 'translate-x-full'
				}`}
			>
				<button className='self-end mt-4 mr-12' onClick={closeCart}>
					<GrClose className='w-8 h-8' />
				</button>

				<div className='px-6'>
					<h2 className='text-2xl'>{`Your Cart (${totalItems})`}</h2>
					{cartItems.length === 0 ? (
						<p className=''>You have no items in your cart</p>
					) : null}
					{cartItems.map((item) => (
						<CartItem
							key={item.id}
							item={item}
							addToCart={addToCart}
							removeFromCart={removeFromCart}
						/>
					))}
					{cartItems.length !== 0 && (
						<h2 className='mt-8'>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
					)}
				</div>
			</aside>
			{isCartOpen && (
				<div
					className='z-10 hidde fixed top-0 left-0 bottom-0 w-screen h-screen bg-darkGray/75 transition duration-200'
					onClick={closeCart}
				/>
			)}
		</>
	);
};

export default Cart;
