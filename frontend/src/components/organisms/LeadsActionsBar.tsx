import {ReactNode} from "react";

export default function LeadsActionsBar({
	label,
	actions,
}: {
	label: ReactNode;
	actions: ReactNode;
}) {
	return (
		<>
			<div className="w-full mb-2 flex border-gray-300 justify-between items-center bg-gray-100 rounded-xl p-2">
				<div>
					{label}
				</div>
				<div className="flex gap-2">
					{actions}
				</div>
			</div>
		</>
	);
}