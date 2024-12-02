import React, { useState, useEffect } from 'react'

import { useContextSummaryData } from '../../context/SummaryData'

import { OrderCoupon } from 'vtex.order-coupon'
import { ThreeDots } from 'react-loader-spinner'

import styles from './styles.module.css'

export function MinicartCoupon({ orderForm }: any) {
  const { useOrderCoupon } = OrderCoupon
  const { insertCoupon } = useOrderCoupon()
  const { setDiscountsPrice, couponActiv } = useContextSummaryData()

  const [newCoupon, setNewCoupon] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fail, setFail] = useState(false)

  let isCouponActiv = orderForm.marketingData.coupon;

  useEffect(() => {
    if (orderForm) {
      // Atualiza o falor dos descontos no contexto do Summary para o cálculo final
      setDiscountsPrice(
        orderForm.totalizers.find((item: any) => item.id === 'Discounts')?.value ?? 0
      )
    }
  }, [orderForm])

  const handleChange = (event: any) => {
    setNewCoupon(event.target.value.trim())
  }

  async function handleSubmit(event: any) {
    event.preventDefault()
    setIsLoading(true)
    const success = await insertCoupon(newCoupon)
    // console.log('sucess', success)

    if (success.success) {
      //setNewCoupon('');
      setFail(false)
    } else {
      setFail(true)
    }
    setIsLoading(false)
  }

  async function resetDiscount() {
    setIsLoading(true)
    await insertCoupon('')
    setIsLoading(false)
  }

  return (
    <div className={styles['minicartCoupon']}>
      <form action="submit" className={fail ? styles['t-fail'] : ''}>
        <label className={styles['minicartCoupon-label']}>
          <span className={styles['minicartCoupon-label-inputWrapper-desc']}>
            Cupom de desconto
          </span>
          <div className={styles['minicartCoupon-label-inputWrapper']}>
            <input
              className={styles['minicartCoupon-input']}
              placeholder="Insira seu cupom"
              name="coupon"
              value={couponActiv ? couponActiv : newCoupon}
              onChange={handleChange}
              disabled={isCouponActiv ? true : false}
            />
            {isCouponActiv ? (
              <button
                type="button"
                onClick={resetDiscount}
                className={styles['minicart_submitBtn']}
              >
                {isLoading ? (
                  <ThreeDots
                    height="25"
                    width="25"
                    radius="9"
                    color="#fff"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                ) : (
                  'Remover'
                )}
              </button>
            ) : (
              <button
                type="submit"
                className={styles['minicart_submitBtn']}
                onClick={ev => handleSubmit(ev)}
              >
                {isLoading ? (
                  <ThreeDots
                    height="25"
                    width="25"
                    radius="9"
                    color="#fff"
                    ariaLabel="three-dots-loading"
                    visible={true}
                  />
                ) : (
                  'APLICAR'
                )}
              </button>
            )}
          </div>
        </label>
      </form>
    </div>
  )
}