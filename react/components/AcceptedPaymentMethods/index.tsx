import React from "react";

import type { PaymentMethod } from "./PaymentMethodIcon";
import PaymentMethodIcon from "./PaymentMethodIcon";

interface Props {
	paymentMethods: PaymentMethod[];
	showInColor: boolean;
}

export function AcceptedPaymentMethods({ paymentMethods = [] }: Props) {
	return (
		<div className={`nh2 flex flex-wrap w-100 items-center justify-center`}>
			{paymentMethods.map((paymentMethod) => (
				<PaymentMethodIcon key={paymentMethod} paymentMethod={paymentMethod} />
			))}
		</div>
	);
}

AcceptedPaymentMethods.schema = {
	title: "Meios de pagamento aceitos",
	description: "Meios de pagamento aceitos pela loja",
	type: "object",
	properties: {
		paymentMethods: {
			title: "Meios de pagamento aceitos",
			type: "array",
			minItems: 2,
			maxItems: 9,
			items: {
				title: "Nome do meio de pagamento",
				type: "string",
				default: "MasterCard",
				enum: [
					"Visa",
					"Boleto",
					"Dinners",
					"Pix",
					"American Express",
					"Hipercard",
					"Hiper",
					"MasterCard",
					"Elo",
				],
			},
		},
	},
};
