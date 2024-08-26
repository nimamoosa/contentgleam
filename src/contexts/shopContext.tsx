'use client'

import { Shop } from '@/types/shop'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from 'react'

interface ShopContextProps {
    cartItems: Shop[]
    setCartItems: Dispatch<SetStateAction<Shop[]>>
}

const ShopContext = createContext<ShopContextProps>({
    cartItems: [],
    setCartItems: (): Shop[] => []
})

export default function ShopProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<Shop[]>([])

    return (
        <ShopContext.Provider
            value={{
                cartItems,
                setCartItems
            }}>
            {children}
        </ShopContext.Provider>
    )
}

export const useShop = () => useContext(ShopContext)
