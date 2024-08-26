'use client'

import { ChatModelTypes } from '@/types/chat_model'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from 'react'
import { useAuth } from './authProvider'

interface ChatModelContextProps {
    chatModel: ChatModelTypes
    setChatModel: Dispatch<SetStateAction<ChatModelTypes>>
}

interface props {
    children: ReactNode
}

const ChatModelContext = createContext<ChatModelContextProps>({
    chatModel: { email: '', userId: '', models: [] },
    setChatModel: () => {}
})

export default function ChatModelProvider({ children }: props) {
    const [chatModel, setChatModel] = useState<ChatModelTypes>({
        email: '',
        userId: '',
        models: []
    })
    const { user } = useAuth()

    useEffect(() => {
        if (user.email == '') return

        const request = async () => {
            try {
                const res = await fetch('/api/models/fetch_model', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.userId })
                })

                if (res.ok) {
                    const json = await res.json()
                    const data = json.data

                    setChatModel(data)
                } else {
                    // alert('An error occurred while fetching data.');
                }
            } catch (error) {
                // alert('An unexpected error occurred.');
            }
        }
        request()
    }, [user])

    return (
        <ChatModelContext.Provider value={{ chatModel, setChatModel }}>
            {children}
        </ChatModelContext.Provider>
    )
}

export const useChatModel = () => useContext(ChatModelContext)
