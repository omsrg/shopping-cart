// interface ButtonProps extends React.ComponentPropsWithoutRef<'button'>,

type ButtonProps = {
	disabled?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

const Button = ({ className, children, ...rest }: ButtonProps) => {
	return (
		<button
			{...rest}
			className={`py-3 border-none rounded-md text-white bg-darkCyan transition-colors duration-200 ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
