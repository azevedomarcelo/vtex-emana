
type ItemsType = {
    quantity: number,
    name: string,
    seller: string,
    id: string
    __typename: string
}[]

type AddItemsType = (items: ItemsType) => void

function addToCart(items: ItemsType, addItems: AddItemsType) {
    if(!items) return

    const mappedItems = items.map(item => ({
        quantity: 1,
        name: item.name,
        seller: item.seller,
        id: item.id,
        __typename: item.__typename
    }))

    addItems(mappedItems)
}

function openCart() {
    const button = document.querySelector('.vtex-minicart-2-x-openIconContainer') as HTMLButtonElement
    if(button) button.click()
}

export function handleMinicart() {
    function addAndOpenMinicart(items: ItemsType, addItems: AddItemsType) {
        addToCart(items, addItems)
        openCart()
    }

    return { addAndOpenMinicart, addToCart, openCart }
}