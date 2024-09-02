'use client'

import { ChatTypes } from '@/types/chat'
import { randomBytes } from 'crypto'
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

interface ChatContextProps {
    textValue: string
    setTextValue: Dispatch<SetStateAction<string>>
    chats: ChatTypes[]
    setChats: Dispatch<SetStateAction<ChatTypes[]>>
    prompt: string
    setPrompt: Dispatch<SetStateAction<string>>
    isLoadingResponse: boolean
    setIsLoadingResponse: Dispatch<SetStateAction<boolean>>
    isLoadingChat: boolean
    setIsLoadingChat: Dispatch<SetStateAction<boolean>>
}

const ChatContext = createContext<ChatContextProps>({
    textValue: '',
    setTextValue: () => {},
    chats: [],
    setChats: (): ChatTypes[] => [],
    prompt: '',
    setPrompt: () => {},
    isLoadingResponse: false,
    setIsLoadingResponse: () => {},
    isLoadingChat: true,
    setIsLoadingChat: () => {}
})

export default function ChatProvider({ children }: { children: ReactNode }) {
    const [textValue, setTextValue] = useState<string>('')
    const [chats, setChats] = useState<ChatTypes[]>([])
    const [isLoadingChat, setIsLoadingChat] = useState<boolean>(true)
    const [prompt, setPrompt] = useState<string>('')
    const [isLoadingResponse, setIsLoadingResponse] = useState<boolean>(false)
    const { user } = useAuth()

    useEffect(() => {
        if (!user || user.email == '') return

        const request = async () => {
            const response = await fetch('/api/chat/fetch_chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user.userId })
            })

            if (response.status === 200) {
                const json = await response.json()
                setChats(json.data)
                setIsLoadingChat(false)
            }
        }

        request()
    }, [user])

    return (
        <ChatContext.Provider
            value={{
                textValue,
                setTextValue,
                chats,
                setChats,
                prompt,
                setPrompt,
                isLoadingResponse,
                setIsLoadingResponse,
                isLoadingChat,
                setIsLoadingChat
            }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => useContext(ChatContext)
