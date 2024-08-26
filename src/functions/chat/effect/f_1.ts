import postChatData from '@/functions/chatData'
import { AuthTypes } from '@/types/auth'
import { ModelTypes } from '@/types/chat_model'
import generateToken from '@/utils/token/token'

export default async function f_1(
    params: { chatId: string },
    findChat: ModelTypes,
    textValue: string,
    user: AuthTypes,
    secret: string,
    onSuccess: (json: { message: string; data: string | object | any }) => void,
    onReject: (e_json: { error: string }) => void,
    onError: (err: Error) => void
) {
    try {
        const response = await postChatData(
            {
                chatId: params.chatId,
                model: findChat.model_name,
                mode: 'success',
                content: textValue,
                role: 'user',
                userId: user.userId
            },
            generateToken(secret),
            secret
        )
        const json = (await response.json()) as {
            message: string
            data: string | object
        }

        if (response.ok || response.status == 200) {
            return onSuccess(json)
        } else {
            return onReject({ error: json.message })
        }
    } catch (error) {
        return onError(error as Error)
    }
}
