import React, { useEffect, useState } from "react";

interface Props {
	title: string;
	link: string;
}

function IframeComponent({ title, link }: Props) {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
	const [, setWindowHeight] = useState<number>(window.innerHeight);

	const handleResize = () => {
		setWindowWidth(window.innerWidth);
		setWindowHeight(window.innerHeight);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const iframeHeight = (windowWidth * 9) / 16;

	return (
		iframeHeight && (
			<div
				style={{ width: "100%", height: iframeHeight, position: "relative" }}
			>
				<iframe
					title={title}
					src={link}
					width="100%"
					height={iframeHeight}
					style={{ border: "none", display: "block" }}
				/>
			</div>
		)
	);
}

export default IframeComponent;
