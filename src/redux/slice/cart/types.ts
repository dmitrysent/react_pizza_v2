export type CartItem = {
    id: string,
    title: string,
    size: number,
    price: number,
    imageUrl: string,
    type: string,
    count: number,
}

export interface CartSliceState {
    totalPrice: number,
    items: CartItem[]
}