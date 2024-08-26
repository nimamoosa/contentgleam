import handleErrorResponse from '@/functions/handleError'
import { AuthTypes } from '@/types/auth'
import { ChatTypes } from '@/types/chat'
import generateToken from '@/utils/token/token'
import { Dispatch, SetStateAction } from 'react'

export default function _3(
    setIsLoadingResponse: Dispatch<SetStateAction<boolean>>,
    userChat: ChatTypes | null,
    setChats: Dispatch<SetStateAction<ChatTypes[]>>,
    user: AuthTypes,
    params: { chatId: string },
    secret: string,
    err_content: string,
    onError: (e: Error) => void
) {
    try {
        const token = generateToken(secret)

        handleErrorResponse(
            undefined,
            setIsLoadingResponse,
            userChat,
            setChats,
            user,
            params,
            token,
            secret,
            err_content
        )
        setIsLoadingResponse(false)
        return
    } catch (error) {
        onError(error as Error)
        setIsLoadingResponse(false)
        return
    } finally {
        setIsLoadingResponse(false)
    }
}
