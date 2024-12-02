import React from 'react'

import { useContextSummaryData } from '../../context/SummaryData'

import styles from './styles.modules.css'

export function MinicartSummary() {
  const { discountsPrice, freightPrice, totalPrice } = useContextSummaryData()

  function formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price / 100)
  }

  return (
    <div className={styles['t-minicartSummary']}>
      {discountsPrice != 0 && (
        <div className={styles['t-minicartSummary-discounts']}>
          <p>
            Descontos<span>{formatPrice(discountsPrice)}</span>
          </p>
        </div>
      )}
      {freightPrice != 0 && (
        <div className={styles['t-minicartSummary-freight']}>
          <p>
            Frete<span>{formatPrice(freightPrice)}</span>
          </p>
        </div>
      )}
      <div className={styles['t-minicartSummary-total']}>
        <p>
          Total
          <span>{formatPrice(totalPrice + freightPrice + discountsPrice)}</span>
        </p>
      </div>
    </div>
  )
}

