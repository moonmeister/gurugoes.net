import { classNames as cn } from "../lib/strings";

export const buttonClasses =
	"font-medium text-green-700 rounded-full bg-gray-50 p-3 border-green-700 hover:text-green-900 focus:border-2";

export function Button({ children, ...props }) {
	return (
		<button {...props} type="button" className={buttonClasses}>
			{children}
		</button>
	);
}

export function Link({ children, className = "", override = false, ...rest }) {
	return (
		<a {...rest} className={cn({ [buttonClasses]: !override }, className)}>
			{children}
		</a>
	);
}

export function ExtLink({
	to,
	href,
	children,
	override = false,
	className,
	...rest
}) {
	return (
		<a
			{...rest}
			href={href || to}
			rel="noopener"
			className={cn({ [buttonClasses]: !override }, className)}
		>
			{children}
		</a>
	);
}
