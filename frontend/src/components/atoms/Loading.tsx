export default function Loading() {
	return (
		<div className="w-dvw h-dvh absolute flex justify-center items-center bg-glass z-40">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }}
				width="50px"
				height="50px"
				viewBox="0 0 100 100"
				preserveAspectRatio="xMidYMid"
			>
				<circle
					cx="50"
					cy="50"
					fill="none"
					stroke="#000"
					strokeWidth="8"
					r="35"
					strokeDasharray="164.93361431346415 56.97787143782138"
				>
					<animateTransform
						attributeName="transform"
						type="rotate"
						repeatCount="indefinite"
						dur="1s"
						values="0 50 50;360 50 50"
						keyTimes="0;1"
					></animateTransform>
				</circle>
			</svg>
		</div>
	);
}
