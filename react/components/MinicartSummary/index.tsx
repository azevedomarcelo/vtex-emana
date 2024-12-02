import React from 'react';

import { OrderCoupon } from "vtex.order-coupon";
import { useOrderForm } from "vtex.order-manager/OrderForm";

import { SummaryDataProvider } from './context/SummaryData';

import { MinicartCoupon } from "./components/MinicartCoupon";
import { MinicartShipping } from './components/MinicartShipping';
import { MinicartSummary as MinicartSummaryComponent } from './components/MinicartSummary';
import styles from "./styles.module.css";

export function MinicartSummary() {
    const { orderForm } = useOrderForm();
  
    return (
      <div className={styles["MinicartSummary"]}>
          <SummaryDataProvider>
              <OrderCoupon.OrderCouponProvider>
                  {/* <MinicartProductQuantity orderForm={orderForm} /> */}
                  <MinicartCoupon orderForm={orderForm} />
                  <MinicartShipping orderForm={orderForm} />
                  <hr />
                  <MinicartSummaryComponent />
              </OrderCoupon.OrderCouponProvider>
          </SummaryDataProvider>
      </div>
    );
  }
  
  