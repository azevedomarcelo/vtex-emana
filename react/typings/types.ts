export interface Product {
  productsByIdentifier: ProductsByIdentifier[]
}

export interface ProductsByIdentifier {
  description: string
  link: string
  linkText: string
  items: Item[]
  __typename: string
}

export interface Item {
  name: string
  itemId: string
  images: Image[]
  sellers: Seller[]
  __typename: string
}

export interface Image {
  imageUrl: string
  imageText: string
  __typename: string
}

export interface Seller {
  sellerId: string
  commertialOffer: CommertialOffer
  __typename: string
}

export interface CommertialOffer {
  Price: number
  ListPrice: number
  AvailableQuantity: number
  __typename: string
}

export interface Variables {
  field: string
  values: string
}
