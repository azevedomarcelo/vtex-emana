// GET PRODUCTS BUY TOGETHER
export default function search(productId: string) {
	const url = `/api/catalog_system/pub/products/crossselling/showtogether/${productId}`;
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	};

	return fetch(url, options)
		.then((res) => res.json())
		.then((res) => res);
}

// GET PROMOTIONS BUY TOGETHER
export async function searchPromotions() {
	// const url = `/api/rnb/pvt/calculatorconfiguration/${promotionId}`
	const url = `/api/rnb/pvt/benefits/calculatorconfiguration`;
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	};

	const idsPromotion = await fetch(url, options)
		.then((res) => res.json())
		.then((res) => {
			const idPromotion: any[] = [];

			res.items.map((item: any) => {
				item.type == "combo"
					? idPromotion.push(item.idCalculatorConfiguration)
					: null;
			});

			return idPromotion;
		});

	idsPromotion.map((id: any) => {
		searchPromotionById(id);
	});
}

// GET PROMOTIONS BUY TOGETHER INFO BY ID
export async function searchPromotionById(promotionId: any) {
	const url = `/api/rnb/pvt/calculatorconfiguration/${promotionId}`;
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	};

	await fetch(url, options)
		.then((res) => res.json())
		.then((res) => res);
}

// SIMULATION OF CART
export function cartSimulation(baseProduct: any, productSuggestions: any) {
	const addToCart = [
		{
			seller: baseProduct?.product?.items[0]?.sellers[0]?.sellerId,
			quantity: 1,
			id: baseProduct?.product?.items[0]?.itemId,
			__typename: "Item",
		},
	];

	productSuggestions?.map((item: any) => {
		item.isSelected
			? addToCart.push({
					seller: item?.items[0]?.sellers[0]?.sellerId,
					quantity: 1,
					id: item?.items[0]?.itemId,
					__typename: "Item",
			  })
			: "";

		return item;
	});

	const url = `/api/checkout/pub/orderForms/simulation`;
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({ items: addToCart }),
	};

	return fetch(url, options)
		.then((res) => res.json())
		.then((res) => {
			return res;
		});
}

export function totalPrice(cartInfo?: any) {
	const totalWithoutDiscount = cartInfo?.totals[0]?.value;
	let totalWithDiscount;

	if (cartInfo?.totals[0]?.value && cartInfo?.totals[1]?.value) {
		totalWithDiscount = cartInfo?.totals[0].value + cartInfo?.totals[1].value;
	}

	console.log(cartInfo, "cartInfocartInfo");

	console.log("INFORMAÇÕES DE PREÇO=>", cartInfo);

	return {
		totalWithoutDiscount: totalWithoutDiscount / 100,
		totalWithDiscount: totalWithDiscount / 100,
	};
}
