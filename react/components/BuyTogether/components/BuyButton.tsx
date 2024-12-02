import React from "react";

interface Props {
	handles: any;
	baseProduct: any;
	productsSuggestions: any;
	addItems: Function;
	text: string;
	eventClick?: Function;
}

export default function BuyButton({
	handles,
	baseProduct,
	productsSuggestions,
	addItems,
	text,
	eventClick,
}: Props) {
	function buyButtonHandle(e: any) {
		const addToCart = [
			{
				seller: baseProduct?.product?.items[0]?.sellers[0]?.sellerId,
				quantity: 1,
				name: baseProduct?.product?.productName,
				id: baseProduct?.product?.items[0]?.itemId,
				__typename: "Item",
			},
		];

		console.log("=>", e);
		productsSuggestions?.map((item: any) => {
			item.isSelected
				? addToCart.push({
						seller: item?.items[0]?.sellers[0]?.sellerId,
						quantity: 1,
						name: item?.productName,
						id: item?.items[0]?.itemId,
						__typename: "Item",
				  })
				: "";

			return item;
		});
		addItems(addToCart);
		if (eventClick) {
			eventClick();
		}
	}

	return (
		<button
			className={handles.confirmationButton}
			onClick={(e: any) => buyButtonHandle(e)}
		>
			{text}
		</button>
	);
}
