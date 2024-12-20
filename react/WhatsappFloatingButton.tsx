import React from "react";

export default function WhatsappFloatingButton() {
	return (
		<a
			aria-label="WhatsApp"
			href="https://api.whatsapp.com/send?phone=5562999526336"
			target="_blank"
			rel="noreferrer"
			className="fixed bottom-2 right-2 z-999 br-100 w3 h3 b--solid flex items-center justify-center"
			style={{ background: "#FFFF5A", color: "#FFFF5A" }}
		>
			<img
				src="https://emana.vtexassets.com/assets/vtex/assets-builder/emana.store-theme/0.1.2/img/icons/whatsapp___dcf9dd1eb38359470e951651823aa326.svg"
				alt="whatsapp"
			/>
		</a>
	);
}
