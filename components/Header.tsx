import { GrCart } from 'react-icons/gr';

interface Props {
	totalItems: number;
	openCartHandler: () => void;
}

const Header = ({ openCartHandler, totalItems }: Props) => {
	const cartOpen = () => {
		openCartHandler();
	};

	return (
		<header className='w-full '>
			<div className='layout py-4 flex justify-end'>
				<div className='relative cursor-pointer' onClick={cartOpen}>
					{totalItems !== 0 && (
						<span className='absolute flex items-center justify-center top-0 -right-2 w-5 h-5 text-white bg-red-500 rounded-full'>
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
