import React, { useState, useEffect, useRef } from 'react'

import { useContextSummaryData } from '../../context/SummaryData'

import InputMask from 'react-input-mask'
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios'

import styles from './styles.module.css'

export function MinicartShipping({ orderForm }: any) {
  const formRef = useRef(null)
  const { setFreightPrice } = useContextSummaryData()

  const [cep, setCep] = useState('')
  const [orderFormId, setOrderFormId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fail, setFail] = useState(false)

  useEffect(() => {
    // console.log("Order form to list", orderForm);
    if (orderForm?.items?.length > 0) {
      setOrderFormId(orderForm.id)
    }
  }, [orderForm])

  function _handleResponse(response: any, error?: any) {
    if (response?.status == 200) {
      setIsLoading(false)
      //setCep('');
      setFail(false)
      // Atualiza o falor do Frete no contexto do Summary para o ca'lculo final
      setFreightPrice(
        response.data.totalizers.find((item: any) => item.id === 'Shipping')?.value ??
          0
      )
      // console.log('shipping', response.data, response)
    } else {
      console.error('Error', error)
      setIsLoading(false)
      setFail(true)
    }
  }

  async function handleSubmit(ev: any) {
    ev.preventDefault()
    if (cep.length == 9) {
      setFail(false)
      setIsLoading(true)
      const url = `/api/checkout/pub/orderForm/${orderFormId}/attachments/shippingData`
      const dataToSend = {
        clearAddressIfPostalCodeNotFound: false,
        selectedAddresses: [
          {
            postalCode: cep,
            country: 'BRA',
          },
        ],
        logisticsInfo: [
          {
            itemIndex: 0,
            selectedDeliveryChannel: 'delivery',
            selectedSla: 'Normal',
          },
        ],
      }

      axios
        .post(url, dataToSend, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          // const price = response.data.totalizers.find(
          //   item => item.id === 'Shipping'
          // )?.value

          _handleResponse(response)
        })
        .catch(error => {
          _handleResponse(null, error)
        })
    } else {
      setFail(true)
    }
  }

  // function formatPrice(price) {
  //   return new Intl.NumberFormat('pt-BR', {
  //     style: 'currency',
  //     currency: 'BRL',
  //   }).format(price)
  // }

  return (
    <div className={styles['t-minicart-shipping']}>
      <form
        action="submit"
        ref={formRef}
        className={fail ? styles['t-fail'] : ''}
        onSubmit={(ev) => handleSubmit(ev)}
      >
        <label className={styles['t-minicart-shipping--label']}>
          <span className={styles['minicartCoupon-label-inputWrapper-desc']}>
            Calcule sua entrega
          </span>
          <div className={styles['t-minicart-shipping--inputWrapper']}>
            <InputMask
              type="tel"
              mask="99999-999"
              maskChar=""
              placeholder="00000-000"
              className={styles['t-postalCode--input']}
              name="postal-code"
              id="postal-code"
              value={cep}
              autoComplete="postal-code"
              onChange={e => {
                setCep(e.target.value)
                e.currentTarget.value.length >= 9 && setFail(false)
              }}
            />
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
                  color="#ffffff"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
              ) : (
                'CALCULAR'
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
  )
}