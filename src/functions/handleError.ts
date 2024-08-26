import { AuthUser } from '@/types/auth'
import { ChatTypes } from '@/types/chat'
import { Dispatch, SetStateAction } from 'react'
import postChatData from './chatData'

export default async function handleErrorResponse(
    responseAI: Response | undefined,
    setIsLoadingResponse: Dispatch<SetStateAction<boolean>>,
    userChat: ChatTypes | undefined | null,
    setChats: Dispatch<SetStateAction<ChatTypes[]>>,
    user: AuthUser,
    params: { chatId: string },
    token: string,
    secret: string,
    content?: string
) {
    setIsLoadingResponse(false)
    const json = await responseAI?.json()
    setChats((prev) =>
        prev.map((chat) =>
            chat.chatId === params.chatId
                ? {
                      ...chat,
                      messages: chat.messages.map((message) =>
                          message.mode === 'pre' && message.role === 'bot'
                              ? {
                                    ...message,
                                    mode: 'error',
                                    content: content || json.message
                                }
                              : message
                      )
                  }
                : chat
        )
    )
    await postChatData(
        {
            chatId: userChat?.chatId,
            model: userChat?.model,
            mode: 'error',
            content: content || json.message,
            role: 'bot',
            userId: user.userId
        },
        token,
        secret
    )
}
