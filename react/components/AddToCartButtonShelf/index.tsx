import React, { MouseEvent } from "react";
import { useProduct } from "vtex.product-context";
import styles from "./styles.module.css"
import { handleMinicart } from "../../utils/handleMinicart";
import { useOrderItems } from 'vtex.order-items/OrderItems'

export function AddToCartButtonShelf() {
    const product = useProduct()
    
    const { addAndOpenMinicart } = handleMinicart()
    const { addItems } = useOrderItems()

    const items = [
        {
            id: product?.selectedItem?.itemId || '',
            name: product?.selectedItem?.name || '',
            quantity: 1,
            seller: product?.selectedItem?.sellers[0].sellerId || '',
            __typename: 'SKU'
        }
    ]

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        event.stopPropagation()

        addAndOpenMinicart(items, addItems)
    }

    return (
        <button className={styles['button-add-to-cart']} onClick={handleClick}>
            Adicionar ao carrinho
        </button>
    )
}