import { ReactNode } from "react";
import classNames from "classnames";

export function Button({ onClick, children, disabled, variant = 'primary', className}: {
	onClick: () => void;
	children: ReactNode;
	disabled?: boolean
	variant?: 'primary' | 'danger';
	className?: string;
}) {
	return (
		<div
			className={classNames(
				"border border-gray-400 rounded-xl px-4 py-1 font-semibold text-center",
				{
					"opacity-50 cursor-not-allowed": disabled,
					"cursor-pointer hover:border-gray-900": !disabled,
					"bg-primary": variant === 'primary',
					"bg-red-500 text-white hover:border-white": variant === 'danger',
				},
				className
			)}
			onClick={() => {
				if (!disabled) {
					onClick();
				}
			}}
		>
			{children}
		</div>
	);
}
