import React, { useEffect, useState } from "react";
import type { QueryResult } from "react-apollo";
import { useQuery } from "react-apollo";
import { useOrderItems } from "vtex.order-items/OrderItems";
import { Link } from "vtex.render-runtime";
import GET_PRODUCT from "../../graphql/getProductById.gql";
import type {
	Product,
	ProductsByIdentifier,
	Variables,
} from "../../typings/types";
import { SacolaComponent } from "./components/Sacola";
import styles from "./styles.module.css";

interface EmAltaCardProps {
	productId: string;
	backgroundCard: string;
	addToCartButton: {
		backgroundColor: string;
		iconColor: string;
		backgroundIconColor: string;
	};
	tagHeader: string;
	tagFooter: [
		{
			iconTag: string;
			nameTag: string;
		},
	];
	children: React.ReactNode;
}

export function EmAltaCard(props: EmAltaCardProps) {
	const [product, setProdcuts] = useState<ProductsByIdentifier>();
	const { data }: QueryResult<Product, Variables> = useQuery(GET_PRODUCT, {
		variables: {
			field: "id",
			values: props.productId,
		},
	});
	const { addItems } = useOrderItems();

	const openMiniCart = () => {
		const button = document.querySelector(
			".vtex-minicart-2-x-openIconContainer",
		) as HTMLButtonElement;

		if (button) button.click();
	};

	useEffect(() => {
		if (data && data.productsByIdentifier[0].items.length >= 1) {
			setProdcuts(data?.productsByIdentifier[0]);
		}
	}, [data]);

	const handleAddToCart = async () => {
		if (!product) return;
		console.log(product);
		const items = product.items.map((item) => ({
			quantity: 1,
			name: item.name,
			seller: item.sellers[0].sellerId,
			id: item.itemId,
			__typename: item.__typename,
		}));

		console.log(items);
		addItems(items);
		openMiniCart();
	};

	return (
		<section
			className={styles["em-alta-card-container"]}
			style={{
				backgroundColor: props.backgroundCard,
			}}
		>
			<header className={styles["em-alta-card-header"]}>
				<p className={styles["em-alta-card-tag-header"]}>{props.tagHeader}</p>
				<div>
					<button
						type="button"
						className={styles["em-alta-card-button"]}
						style={{
							backgroundColor: props.addToCartButton.backgroundColor,
						}}
						onClick={handleAddToCart}
					>
						<SacolaComponent
							color={props.addToCartButton.iconColor}
							className={styles["em-alta-card-icon"]}
						/>
						<span
							className={styles["em-alta-card-plus"]}
							style={{
								backgroundColor: props.addToCartButton.backgroundIconColor,
							}}
						>
							+
						</span>
					</button>
				</div>
			</header>
			<Link to={`/${product?.linkText}/p`} className="no-underline">
				<main className={styles["em-alta-card-product-section"]}>
					<img
						className={styles["em-alta-card-product-image"]}
						src={product?.items[0].images[0].imageUrl}
						alt={product?.items[0].name}
					/>

					<p className={styles["em-alta-card-product-name"]}>
						{product?.items[0].name}
					</p>
				</main>
			</Link>
			<footer className={styles["em-alta-card-footer"]}>
				{props.tagFooter.map((tag) => (
					<div
						key={tag.nameTag}
						className={styles["em-alta-card-footer-content"]}
					>
						<img
							className={styles["em-alta-card-footer-icon"]}
							src={tag.iconTag}
							alt={tag.nameTag}
						/>
						{/* <p className={styles["em-alta-card-footer-tag"]}>{tag.nameTag}</p> */}
					</div>
				))}
			</footer>
		</section>
	);
}

EmAltaCard.schema = {
	title: "Em Alta",
	description: "",
	type: "object",
	properties: {
		productId: {
			title: "Id do produto",
			default: "",
			type: "string",
		},
		backgroundCard: {
			title: "Cor de fundo do card",
			default: "#D9D9D9",
			description: "Hexadecimal Ex.: #D9D9D9",
			type: "string",
		},
		addToCartButton: {
			title: "Botão de adicionar ao carrinho",
			type: "object",
			properties: {
				backgroundColor: {
					title: "Cor de fundo do botão",
					default: "#5A5555",
					description: "Hexadecimal Ex.: #5A5555",
					type: "string",
				},
				iconColor: {
					title: "Cor do ícone",
					default: "#FFF",
					description: "Hexadecimal Ex.: #FFFFFF",
					type: "string",
				},
				backgroundIconColor: {
					title: "Cor de fundo do ícone",
					default: "#FFFF5A",
					description: "Hexadecimal Ex.: #FFFF5A",
					type: "string",
				},
			},
		},
		tagHeader: {
			title: "Tag do cabeçalho",
			default: "",
			type: "string",
		},
		tagFooter: {
			title: "Tags do rodapé",
			type: "array",
			items: {
				properties: {
					iconTag: {
						title: "Ícone",
						type: "string",
						default: "",
					},
					nameTag: {
						title: "Name",
						type: "string",
						default: "",
					},
				},
			},
		},
	},
};
