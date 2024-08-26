'use client'

import { ConfigTypes } from '@/types/config'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from 'react'

interface ControllerContextProps {
    showModel: boolean
    setShowModel: Dispatch<SetStateAction<boolean>>
    configSelect: ConfigTypes
    setConfigSelect: Dispatch<SetStateAction<ConfigTypes>>
}

const ControllerContext = createContext<ControllerContextProps>({
    showModel: false,
    setShowModel: () => {},
    configSelect: {},
    setConfigSelect: () => {}
})

export default function ControllerProvider({
    children
}: {
    children: ReactNode
}) {
    const [showModel, setShowModel] = useState<boolean>(false)
    const [configSelect, setConfigSelect] = useState<ConfigTypes>({})

    return (
        <ControllerContext.Provider
            value={{
                setShowModel,
                showModel,
                configSelect,
                setConfigSelect
            }}>
            {children}
        </ControllerContext.Provider>
    )
}

export const useController = () => useContext(ControllerContext)
