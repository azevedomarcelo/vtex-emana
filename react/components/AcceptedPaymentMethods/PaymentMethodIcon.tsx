import type { ReactNodeArray } from "react";
import React from "react";
import { useIntl } from "react-intl";
import { formatIOMessage } from "vtex.native-types";

import americanExpress from "./icons/americanexpress.png";
import boleto from "./icons/boleto.png";
import dinnersclub from "./icons/dinnersclub.png";
import elo from "./icons/elo.png";
import hiper from "./icons/hiper.png";
import hipercard from "./icons/hipercard.png";
import mastercard from "./icons/mastercard.png";
import pix from "./icons/pix.png";
import visa from "./icons/visa.png";

const PAYMENT_METHOD_ICONS = {
	"american express": americanExpress,
	elo,
	hipercard,
	mastercard,
	visa,
	hiper,
	boleto,
	pix,
	"dinners club": dinnersclub,
};

export type PaymentMethod =
	| "americanexpress"
	| "elo"
	| "hipercard"
	| "mastercard"
	| "visa"
	| "dinnersclub"
	| "hiper"
	| "pix"
	| "boleto";

function isValidIcon(key: string): key is keyof typeof PAYMENT_METHOD_ICONS {
	return key in PAYMENT_METHOD_ICONS;
}

interface Props {
	imageSrc?: string;
	paymentMethod: PaymentMethod;
}

const getImagePathFromProps = ({
	paymentMethod,
}: Pick<Props, "paymentMethod">) => `${paymentMethod.toLowerCase()}`;

const ensureString = (value: string | ReactNodeArray | undefined): string => {
	return typeof value === "string" ? value : "";
};

function PaymentMethodIcon({ paymentMethod }: Props) {
	const intl = useIntl();

	const imagePath = getImagePathFromProps({ paymentMethod });

	if (!isValidIcon(imagePath)) {
		return null;
	}

	const imageSrc = PAYMENT_METHOD_ICONS[imagePath];
	const formattedMessage = formatIOMessage({ id: paymentMethod, intl });

	return (
		<div className={`w-9 h-9 mh2 pl5 flex items-center mv2`}>
			<img
				className={` w-100`}
				src={imageSrc}
				alt={ensureString(formattedMessage)}
				title={ensureString(formattedMessage)}
			/>
		</div>
	);
}

export default PaymentMethodIcon;
