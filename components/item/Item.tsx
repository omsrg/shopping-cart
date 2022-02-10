import Image from 'next/image';
import { ItemType } from '../../types/ItemType';
import { useAddToCart } from '../../context/CartContext';

type Props = {
	item: ItemType;
};

const Item = ({ item }: Props) => {
	const addToCart = useAddToCart();

	return (
		<div className='border flex flex-col p-4 rounded-md shadow-sm shadow-darkCyan/40'>
			<div className='mx-auto'>
				<Image
					src={item.image}
					alt={item.title}
					objectFit='contain'
					width={200}
					height={200}
				/>
			</div>
			<div className='my-4'>
				<h3 className='text-base text-darkCyan'>{item.title}</h3>
				<p className='text-sm my-3 line-clamp-2'>{item.description}</p>
				<h3 className='text-base'>${item.price}</h3>
			</div>
			<button onClick={() => addToCart(item)} className='button mt-auto'>
				Add to cart
			</button>
		</div>
	);
};

export default Item;
