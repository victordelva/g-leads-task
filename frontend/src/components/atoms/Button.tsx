import { ReactNode } from "react";
import classNames from "classnames";

export function Button({ onClick, children, disabled }: {
	onClick: () => void;
	children: ReactNode;
	disabled?: boolean;
}) {
	return (
		<div
			className={classNames(
				"border border-gray-400 bg-white rounded-xl px-4 py-1 font-semibold",
				{
					"opacity-50 cursor-not-allowed": disabled,
					"cursor-pointer hover:border-gray-900": !disabled,
				}
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
