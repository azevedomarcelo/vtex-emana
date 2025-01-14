import React, { FormEvent, useEffect, useRef, useState } from "react";

import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import { useContextSummaryData } from "../../context/SummaryData";

import { OrderFormProps } from "../../../../typings/orderForm";
import { cepMask } from "../../../../utils/masks";
import styles from "./styles.module.css";

export function MinicartShipping({ orderForm }: OrderFormProps) {
	const formRef = useRef(null);
	const { setFreightPrice } = useContextSummaryData();

	const [cep, setCep] = useState("");
	const [orderFormId, setOrderFormId] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [fail, setFail] = useState(false);
	useEffect(() => {
		if (orderForm?.items?.length > 0) {
			setOrderFormId(orderForm.id);
		}
	}, [orderForm]);

	function _handleResponse(response: any, error?: string) {
		if (response?.status == 200) {
			setIsLoading(false);
			setFail(false);
			const freightPrice =
				response.data.totalizers.find(
					(item: { id: string }) => item.id === "Shipping",
				)?.value ?? 0;

			setFreightPrice(freightPrice);
		} else {
			console.error("Error", error);
			setIsLoading(false);
			setFail(true);
		}
	}

	async function handleSubmit(ev: FormEvent) {
		ev.preventDefault();
		if (cep.length == 9) {
			setFail(false);
			setIsLoading(true);
			const url = `/api/checkout/pub/orderForm/${orderFormId}/attachments/shippingData`;
			const dataToSend = {
				selectedAddresses: [
					{
						postalCode: cep,
						country: "BRA",
					},
				],
				logisticsInfo: [
					{
						itemIndex: 0,
						selectedDeliveryChannel: "delivery",
						selectedSla: "Normal",
					},
				],
			};

			axios
				.post(url, dataToSend, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then((response) => {
					_handleResponse(response);
				})
				.catch((error) => {
					_handleResponse(null, error);
				});
		} else {
			setFail(true);
		}
	}

	return (
		<div className={styles["t-minicart-shipping"]}>
			<form
				action="submit"
				ref={formRef}
				className={fail ? styles["t-fail"] : ""}
				onSubmit={(ev) => handleSubmit(ev)}
			>
				<label className={styles["t-minicart-shipping--label"]}>
					<span className={styles["minicartCoupon-label-inputWrapper-desc"]}>
						Calcule sua entrega
					</span>
					<div className={styles["t-minicart-shipping--inputWrapper"]}>
						<input
							type="tel"
							placeholder="00000-000"
							className={styles["t-postalCode--input"]}
							name="postal-code"
							id="postal-code"
							value={cep}
							autoComplete="postal-code"
							onChange={(e) => {
								setCep(cepMask(e.target.value));
								e.currentTarget.value.length >= 9 && setFail(false);
							}}
						/>
						<button
							type="submit"
							className={styles.minicart_submitBtn}
							onClick={(ev) => handleSubmit(ev)}
						>
							{isLoading ? (
								<ThreeDots
									height="25"
									width="25"
									radius="9"
									color="#ffffff"
									ariaLabel="three-dots-loading"
									visible={true}
								/>
							) : (
								"CALCULAR"
							)}
						</button>
					</div>
				</label>
			</form>

			{/* {
        shippingPrice != 0 && (
          <div className={styles["t-shipping-priceContainer"]}>
            <span>Entrega</span>
            <span>{formatPrice(shippingPrice / 100)}</span>
          </div>
        )
      } */}
		</div>
	);
}
