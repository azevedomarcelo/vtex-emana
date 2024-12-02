import React, { useEffect, useState } from "react";
import { FormattedCurrency } from "vtex.format-currency";

import SelectButton from "./SelectButton";
// @ts-ignore
interface Props {
	handles: any;
	imageUrl: string;
	productName: string;
	price: any;
	isProductBase: boolean;
	products?: any;
	setProducts?: Function;
	link: string;
}

export default function ProductItem({
	handles,
	imageUrl,
	productName,
	price,
	isProductBase,
	products,
	setProducts,
	link,
}: Props) {
	const [select, setSelection] = useState(true);

	useEffect(() => {
		if (products) {
			const productsSellected = products?.map((item: any) => {
				if (productName == item.productName) {
					item.isSelected = select;
				}

				return item;
			});

			if (setProducts) {
				setProducts(productsSellected);
			}
		}
	}, [select]);

	return (
		<div
			className={`${handles.item} ${
				!isProductBase
					? select
						? handles.itemSelected
						: ""
					: handles.itemSelected
			}`}
		>
			<a className={`${handles.itemLink}`} href={`/${link}/p`}>
				<div className={handles.itemImageContainer}>
					<img className={handles.itemImage} src={imageUrl} alt={productName} />
				</div>
				<div className={handles.productInfosContainer}>
					<div className={handles.itemName}>{productName}</div>
					<div className={handles.itemPrice}>
						<FormattedCurrency value={price} />
					</div>
				</div>
			</a>
			{isProductBase ? (
				""
			) : (
				<SelectButton
					handles={handles}
					setSelection={setSelection}
					selected={select}
				/>
			)}
		</div>
	);
}
