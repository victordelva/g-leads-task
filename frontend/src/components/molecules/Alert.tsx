import classNames from "classnames";
import CloseIcon from "../atoms/CloseSvg.tsx";
import {useState} from "react";

export default function Alert({message, type = 'success' }: {message?: string, type?: 'success' | 'error'}) {
	const [_message, setMessage] = useState<string | null>(message ?? null);
	return (
		<>
			{_message && (
				<div className={classNames("fixed top-0 right-0 m-4 text-white p-4 rounded-lg z-50", {
					'bg-red-500': type === 'error',
					'bg-green-500': type === 'success',
				})}>
					<div className="flex items-center">
						{_message}
						<div
							className="cursor-pointer ml-2"
							onClick={() => setMessage(null)}
						>
							<CloseIcon />
						</div>
					</div>
				</div>
			)}
		</>
	)
}