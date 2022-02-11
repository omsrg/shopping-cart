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
		<header className='fixed w-full py-8 z-50'>
			<div className='layout px-4 flex justify-end'>
				<div className='relative cursor-pointer' onClick={cartOpen}>
					{totalItems !== 0 && (
						<span className='absolute font-semibold flex items-center justify-center -top-3 -right-3 w-5 h-5 text-white bg-red-500 rounded-full'>
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
