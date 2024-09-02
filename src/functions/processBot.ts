import { Dispatch, SetStateAction } from 'react'
import { ChatTypes } from '@/types/chat'
import postChatData from './chatData'
import { AuthUser } from '@/types/auth'
import handleErrorResponse from './handleError'
import updateUserPoints from './point'
import { EncJET } from './token'

export default async function processBotResponse(
    prompt: string,
    token: string,
    secret: string,
    setChats: Dispatch<SetStateAction<ChatTypes[]>>,
    params: { chatId: string },
    userChat: ChatTypes | undefined | null,
    user: AuthUser,
    options: {
        setIsLoadingResponse: Dispatch<SetStateAction<boolean>>
        point_token: string
        setUser: Dispatch<SetStateAction<AuthUser>>
    }
) {
    const responseAI = await fetch('/api/bot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            enc: EncJET(
                JSON.stringify({
                    prompt: prompt
                }),
                secret
            )
        })
    })

    if (responseAI.status === 200) {
        const json = await responseAI.json()
        setChats((prev) =>
            prev.map((chat) =>
                chat.chatId === params.chatId
                    ? {
                          ...chat,
                          messages: chat.messages.map((message) =>
                              message.mode === 'pre'
                                  ? {
                                        ...message,
                                        mode: 'success',
                                        content: json.data
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
                mode: 'success',
                content: json.data,
                role: 'bot',
                userId: user.userId
            },
            token,
            secret
        )
        updateUserPoints(options.point_token, userChat, options.setUser, user)
        options.setIsLoadingResponse(false)
    } else {
        handleErrorResponse(
            responseAI,
            options.setIsLoadingResponse,
            userChat,
            setChats,
            user,
            params,
            token,
            secret
        )
    }
}
