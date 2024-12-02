import React, { createContext, useState, useContext, useEffect } from "react";
import { useOrderForm } from "vtex.order-manager/OrderForm";

const ContextSummaryData = createContext<any>({
});

export const SummaryDataProvider = ({ children }: any) => {
  const { orderForm } = useOrderForm();

  const [orderFormUpdated, setOrderFormUpdated] = useState(0);
  const [discountsPrice, setDiscountsPrice] = useState(0);
  const [freightPrice, setFreightPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [couponActiv, setCouponActiv] = useState("");

  useEffect(() => {
    if (orderForm) {
      // console.log("provider", orderForm)
      const providerFreightPrice =
        orderForm.totalizers.find((item: any) => item.id == "Shipping")?.value ?? 0;
      const providerDiscountsPrice =
        orderForm.totalizers.find((item: any) => item.id == "Discounts")?.value ?? 0;
      let providerTotalPrice = 0;

      if (orderForm.totalizers.length > 0) {
        providerTotalPrice =
          orderForm.totalizers.find((item: any) => item.id == "Items")?.value ?? 0;
      } else {
        providerTotalPrice = orderForm.value;
      }

      setFreightPrice(providerFreightPrice);
      setDiscountsPrice(providerDiscountsPrice);
      setTotalPrice(providerTotalPrice);
    }
  }, [orderForm]);

  useEffect(() => {
    if (orderForm) {
      const providerCouponActiv = orderForm.marketingData.coupon ?? "";

      setCouponActiv(providerCouponActiv);
    }
  }, [orderForm.marketingData.coupon]);

  return (
    <ContextSummaryData.Provider
      value={{
        orderFormUpdated,
        setOrderFormUpdated,
        discountsPrice,
        setDiscountsPrice,
        freightPrice,
        setFreightPrice,
        totalPrice,
        setTotalPrice,
        couponActiv,
        setCouponActiv,
      }}
    >
      {children}
    </ContextSummaryData.Provider>
  );
};

export const useContextSummaryData = () => {
  const context = useContext(ContextSummaryData);
  const {
    orderFormUpdated,
    setOrderFormUpdated,
    discountsPrice,
    setDiscountsPrice,
    freightPrice,
    setFreightPrice,
    totalPrice,
    setTotalPrice,
    couponActiv,
    setCouponActiv,
  } = context;
  return {
    orderFormUpdated,
    setOrderFormUpdated,
    discountsPrice,
    setDiscountsPrice,
    freightPrice,
    setFreightPrice,
    totalPrice,
    setTotalPrice,
    couponActiv,
    setCouponActiv,
  };
};
