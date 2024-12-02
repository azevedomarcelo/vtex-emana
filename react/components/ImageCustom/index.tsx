import * as React from "react";

interface ImageProps {
	src: string;
	alt: string;
}

export function ImageCustom({ src, alt }: ImageProps) {
	return (
		<div>
			<img src={src} alt={alt} />
		</div>
	);
}

ImageCustom.schema = {
	title: "Image Custom",
	description: "",
	type: "object",
	properties: {
		src: {
			title: "URL da imagem",
			default: "",
			type: "string",
		},
		alt: {
			type: "string",
			title: "Image Text Alternative",
			default: "Imagem",
		},
	},
};
