import React, { useEffect, useState } from 'react'
import { OrderItemsProvider, useOrderItems } from 'vtex.order-items/OrderItems'
import { OrderFormProvider } from 'vtex.order-manager/OrderForm'
import { FormattedCurrency } from 'vtex.format-currency'
import { usePixel } from 'vtex.pixel-manager'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'

import search, { totalPrice, cartSimulation } from './utils/requests'
import ProductItem from './components/ProductItem'
import BuyButton from './components/BuyButton'

const CSS_HANDLES = [
	'container',
	'content',
	'title',
	'productsContainer',
	'item',
	'itemSelected',
	'itemImageContainer',
	'itemImage',
	'itemName',
	'itemPrice',
	'itemLink',
	'plus',
	'equals',
	'confirmationContainer',
	'confirmation',
	'confirmationButton',
	'confimationPrices',
	'totalText',
	'productsText',
	'countProducts',
	'totalPrice',
	'selectToBuy',
	'unselectToBuy',
	'listPrice',
	'productInfosContainer',
] as const

type BuyTogetherProps = {
	title: string
	showTitle: boolean
}

export function BuyTogether({
	title = 'Compre Junto',
	showTitle = true,
}: BuyTogetherProps) {
	const handles = useCssHandles(CSS_HANDLES)
	const product = useProduct()

	const [productsBuyTogether, setProductsBuyTogether] = useState([])
	const [cartInfo, setCartInfo] = useState()
	const { addItems } = useOrderItems()
	const { push } = usePixel()
	const openMiniCart = () => {
		push({
			id: 'add-to-cart-button',
			event: 'addToCart',
		})
	}

	async function getProducts(id: any) {
		const response = await search(id)

		return response
	}

	async function getCartInfo(product: any, productsGroup: any) {
		const response = await cartSimulation(product, productsGroup)

		return response
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getProducts(product?.product?.productId).then(data => createToggle(data))
	}, [product])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getCartInfo(product, productsBuyTogether).then(data => setCartInfo(data))
	}, [productsBuyTogether])

	function createToggle(productsSuggestions: any) {
		if (productsSuggestions) {
			productsSuggestions?.map((item: any) => {
				item.isSelected = true
			})
			setProductsBuyTogether(productsSuggestions)
		}
	}

	function countProducts(productsSuggestions: any) {
		let counterProducts = 1

		productsSuggestions?.map((item: any) => {
			item.isSelected ? counterProducts++ : null
		})

		return counterProducts
	}

	if (productsBuyTogether?.length > 0) {
		return (
			<OrderFormProvider>
				<OrderItemsProvider>
					{!!showTitle && !!title && <h2 className={handles.title}>{title}</h2>}
					<div className={handles.container}>
						<div className={handles.content}>
							{productsBuyTogether && (
								<div className={handles.productsContainer}>
									{/* CONTAINER CURRENCT PRODUCT */}
									<ProductItem
										handles={handles}
										imageUrl={`${product?.product?.items[0].images[0].imageUrl}`}
										productName={`${product?.product?.productName}`}
										price={
											product?.product?.items[0].sellers[0].commertialOffer
												.Price
										}
										isProductBase
										link={`${product?.product?.linkText}`}
									/>
									<div className={handles.plus}>+</div>

									{/* CONTAINER PRODUCTS TO BUY TOGETHER */}
									{productsBuyTogether?.map((item: any, index: any) => (
										<>
											<ProductItem
												key={item}
												handles={handles}
												imageUrl={item.items[0].images[0].imageUrl}
												productName={item.productName}
												price={item.items[0].sellers[0].commertialOffer.Price}
												isProductBase={false}
												products={productsBuyTogether}
												setProducts={setProductsBuyTogether}
												link={item.linkText}
											/>

											{index != productsBuyTogether.length - 1 && (
												<div className={handles.plus}>+</div>
											)}
										</>
									))}
									<div className={handles.equals}>=</div>
								</div>
							)}
							{/* CONTAINER BUY TOGETHER CONFIRMATION */}
							<div className={handles.confirmationContainer}>
								<span className={handles.totalText}>
									Preço total dos itens:
								</span>
								<span className={handles.confimationPrices}>
									<span className={handles.countProducts}>
										{countProducts(productsBuyTogether)}
									</span>
									<span className={handles.productsText}>
										{totalPrice(cartInfo).totalWithDiscount
											? countProducts(productsBuyTogether) > 1
												? 'produtos'
												: 'produto'
											: countProducts(productsBuyTogether) > 1
												? 'produtos'
												: 'produto'}
									</span>
									{/* {totalPrice(cartInfo).totalWithDiscount ? (
										<span className={handles.listPrice}>
											De:
											<FormattedCurrency
												value={totalPrice(cartInfo).totalWithoutDiscount}
											/>
										</span>
									) : (
										""
									)} */}
									<span className={handles.totalPrice}>
										<FormattedCurrency
											value={
												totalPrice(cartInfo).totalWithDiscount
													? totalPrice(cartInfo).totalWithDiscount
													: totalPrice(cartInfo).totalWithoutDiscount
											}
										/>
									</span>
								</span>

								<BuyButton
									handles={handles}
									addItems={addItems}
									productsSuggestions={productsBuyTogether}
									baseProduct={product}
									text="COMPRAR"
									eventClick={openMiniCart}
								/>
							</div>
						</div>
					</div>
				</OrderItemsProvider>
			</OrderFormProvider>
		)
	}

	return ''
}
