import { GrCart } from 'react-icons/gr';
import { useTotalItems } from '../context/CartContext';

interface Props {
	openCartHandler: () => void;
}

const Header = ({ openCartHandler }: Props) => {
	const totalItems = useTotalItems();
	const cartOpen = () => {
		openCartHandler();
	};

	return (
		<header className='w-full py-8'>
			<div className='layout flex justify-end'>
				<div className='relative cursor-pointer' onClick={cartOpen}>
					{totalItems !== 0 && (
						<span className='absolute font-semibold flex items-center justify-center -top-3 -right-3 w-6 h-6 text-white bg-red-500 rounded-full'>
							{totalItems}
						</span>
					)}
					<GrCart className='w-8 h-8' />
				</div>
			</div>
		</header>
	);
};

export default Header;
