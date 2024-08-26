import { AuthTypes } from '@/types/auth'
import { ChatMessageTypes, ChatTypes } from '@/types/chat'
import { Dispatch, SetStateAction } from 'react'

const updateChats = (
    dataGiver: ChatTypes,
    lastMessage: ChatMessageTypes,
    params: { chatId: string },
    userChat: ChatTypes | undefined | null,
    user: AuthTypes,
    setChats: Dispatch<SetStateAction<ChatTypes[]>>
) => {
    setChats((prev) => {
        const existingChat = prev.find((chat) => chat.chatId === params.chatId)
        const emptyMessage: ChatMessageTypes = {
            content: 'empty',
            messageId: '',
            mode: 'pre',
            role: 'bot',
            timestamp: 2
        }

        if (!existingChat) {
            return [
                ...prev,
                {
                    chatId: params.chatId,
                    messages: [...dataGiver.messages, emptyMessage],
                    model:
                        userChat?.model ||
                        'instagram-engagement-boost-strategies',
                    user_info: {
                        email: user.email,
                        userId: user.userId
                    },
                    create_at: dataGiver.create_at
                }
            ]
        }

        const updatedMessages = [
            ...existingChat.messages,
            lastMessage,
            emptyMessage
        ]
        return prev.map((chat) =>
            chat.chatId === existingChat.chatId
                ? { ...existingChat, messages: updatedMessages }
                : chat
        )
    })
}

export default updateChats
