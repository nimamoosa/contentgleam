const shopItems: {
    count: number
    price: number
    discount?: { is_discount: boolean; discount_price: number }
}[] = [
    {
        count: 10,
        price: 18,
        discount: {
            discount_price: 12,
            is_discount: true
        }
    },
    {
        count: 20,
        price: 25,
        discount: {
            is_discount: true,
            discount_price: 20
        }
    },
    {
        count: 30,
        price: 32,
        discount: {
            is_discount: true,
            discount_price: 28
        }
    }
]

export default shopItems
