import React from 'react';

import styles from './styles.module.css';

export function MinicartProductQuantity({orderForm}: any) {
  return (
    <div className={styles["t-minicart-product-quantityContainer"]}>
      <div className={styles["t-minicart-product-quantityImage"]}>
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Cart">
          <path id="Vector 7241" d="M4.33333 10.6668H9.17548C12.1672 10.6668 12.6222 8.78739 13.174 6.04621C13.3332 5.25557 13.4128 4.86025 13.2214 4.59687C13.03 4.3335 12.6631 4.3335 11.9294 4.3335H3" stroke="#2A353D" stroke-linecap="round"/>
          <path id="Vector 7244" d="M4.33268 10.6668L2.58517 2.34345C2.43678 1.74989 1.90347 1.3335 1.29165 1.3335H0.666016" stroke="#2A353D" stroke-linecap="round"/>
          <path id="Vector 7266" d="M4.92 10.667H4.64571C3.73681 10.667 3 11.4345 3 12.3813C3 12.5391 3.1228 12.667 3.27429 12.667H10.6667" stroke="#2A353D" stroke-linecap="round" stroke-linejoin="round"/>
          <circle id="Ellipse 1759" cx="6" cy="13.667" r="1" stroke="#2A353D"/>
          <circle id="Ellipse 1972" cx="10.666" cy="13.667" r="1" stroke="#2A353D"/>
          </g>
        </svg>
      </div>
      
      <div className={styles["t-minicart-product-quantity"]}>{orderForm.items?.length}</div>
    </div>
  );
}