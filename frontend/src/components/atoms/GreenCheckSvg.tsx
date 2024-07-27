import classNames from "classnames";

export default function GreenCheckSvg({
  className,
}: {
	className?: string;
}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={classNames("h-6 w-6 text-green-500", className)}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M5 13l4 4L19 7"
			/>
		</svg>
	);
}