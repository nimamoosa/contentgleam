import postChatData from '@/functions/chatData'
import { AuthTypes } from '@/types/auth'
import { ChatTypes } from '@/types/chat'
import generateToken from '@/utils/token/token'

export default async function _1(
    params: { chatId: string },
    userChat: ChatTypes | null | undefined,
    promote_ai: string,
    user: AuthTypes,
    secret: string,
    onSuccess: (json: { message: string; data: string | object | any }) => void,
    onReject: (e_json: { message: string }) => void,
    onError: (e: Error) => void
) {
    try {
        const token = generateToken(secret)

        const response = await postChatData(
            {
                chatId: params.chatId,
                model: userChat?.model,
                mode: 'success',
                content: promote_ai,
                role: 'user',
                userId: user.userId
            },
            token,
            secret
        )
        const json = (await response.json()) as {
            message: string
            data: string | object
        }

        if (response.ok || response.status === 200) {
            return onSuccess(json)
        } else {
            return onReject({ message: json.message })
        }
    } catch (error) {
        return onError(error as Error)
    }
}
