import { useEffect, useState } from 'react'
import TemplatesAI from '@/utils/AI/Templates'
import { ChatTypes } from '@/types/chat'
import { AuthTypes } from '@/types/auth'
import { useRouter } from 'next/navigation'

const useChatInitialization = (
    chats: ChatTypes[],
    params: { chatId: string },
    user: AuthTypes | null
) => {
    const [userChat, setUserChat] = useState<ChatTypes | null>(null)
    const [templates, setTemplates] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        if (!chats || !chats.length) setIsLoading(false)
        const findChats = chats.find((ct) => ct.chatId === params.chatId)

        if (!findChats) {
            setError(true)
            setUserChat(null)
        } else {
            setUserChat(findChats)
        }

        // if ((!isLoading && !user) || user?.email === '') router.push('/')

        setTemplates(TemplatesAI())
        setIsLoading(false)
    }, [chats])

    return { userChat, setUserChat, templates, isLoading, error }
}

export default useChatInitialization
