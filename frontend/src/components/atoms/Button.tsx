import { ReactNode } from "react";

export function Button({ onClick, children }: {
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<div
			className="cursor-pointer border border-gray-400 bg-white rounded-xl px-4 py-1 font-semibold hover:border-gray-900"
			onClick={onClick}
		>
			{children}
		</div>
	);
}
