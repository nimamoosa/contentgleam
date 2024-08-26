'use client'

import { Display, Grid } from '@/components/display'
import shopItems from '@/constant/shopItems'
import { useShop } from '@/contexts/shopContext'
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'

export default function ShopPage() {
    const { setCartItems, cartItems } = useShop()

    const handleAddItems = (item: { count: number; price: number }) => {
        setCartItems((prev) =>
            prev.some((ci) => ci.count == item.count)
                ? prev.filter((ci) => ci.count !== item.count)
                : [...prev, { ...item }]
        )
    }

    const handleCheckAdded = (count: number) =>
        cartItems.some((ci) => ci.count == count)
            ? 'Remove From Cart'
            : 'Add To Cart'

    return (
        <Display className="mt-20 p-2">
            <Grid grid_cols={3} justify_items="center">
                {shopItems.map((item, index) => {
                    return (
                        <Card key={index} className="py-4 w-fit">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold mb-1">
                                    Gleam Points
                                </p>
                                {item.discount?.is_discount ? (
                                    <div className="text-default-700/80">
                                        <s className="mr-3">{item.price} T</s>
                                        <span>
                                            {item.discount.discount_price} T
                                        </span>
                                    </div>
                                ) : (
                                    <span>{item.price} T</span>
                                )}
                                <h4 className="font-bold text-large">
                                    {item.count} Points
                                </h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src="https://nextui.org/images/hero-card-complete.jpeg"
                                    width={270}
                                />
                                <Button
                                    className="mt-5"
                                    onClick={() => handleAddItems(item)}>
                                    {handleCheckAdded(item.count)}
                                </Button>
                            </CardBody>
                        </Card>
                    )
                })}
            </Grid>
        </Display>
    )
}
