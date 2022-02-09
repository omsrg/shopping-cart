import { CartItemType } from '../../pages/index';
import Image from 'next/image';
import Button from '../Button';

type Props = {
	item: CartItemType;
	addToCart: (chosenItem: CartItemType) => void;
	removeFromCart: (id: number) => void;
};

const CartItem = ({ item, addToCart, removeFromCart }: Props) => {
	return (
		<div className='mt-4 border-b pb-6 border-darkGray flex justify-center gap-x-4'>
			<div className='w-9/12'>
				<h3 className='my-2 text-base'>{item.title}</h3>
				<div className='text-sm flex justify-between'>
					<p>Price: ${item.price}</p>
					<p>Total: ${(item.amount * item.price).toFixed(2)}</p>
				</div>
				<div className='mt-4 flex justify-between'>
					<Button className='px-6' onClick={() => removeFromCart(item.id)}>
						-
					</Button>
					<p>{item.amount}</p>
					<Button className='px-6' onClick={() => addToCart(item)}>
						+
					</Button>
				</div>
			</div>
			<Image src={item.image} alt={item.title} width={100} height={100} objectFit='contain' />
		</div>
	);
};

export default CartItem;
