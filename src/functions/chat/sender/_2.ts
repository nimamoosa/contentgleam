import replace from '@/constant/replacements'
import processBotResponse from '@/functions/processBot'
import updateChats from '@/functions/updateChats'
import { AuthTypes } from '@/types/auth'
import { BotTypes } from '@/types/bot'
import { ChatMessageTypes, ChatTypes } from '@/types/chat'
import { ConfigTypes } from '@/types/config'
import generateToken from '@/utils/token/token'
import { Dispatch, SetStateAction } from 'react'

export default async function _2(
    dataGiver: ChatTypes | any,
    lastMessage: ChatMessageTypes,
    params: { chatId: string },
    userChat: ChatTypes | null,
    user: AuthTypes,
    setChats: Dispatch<SetStateAction<ChatTypes[]>>,
    configSelect: ConfigTypes,
    textValue: string,
    finalPromote: BotTypes | undefined,
    promote_ai: string,
    secret: string,
    setIsLoadingResponse: Dispatch<SetStateAction<boolean>>,
    setUser: Dispatch<SetStateAction<AuthTypes>>,
    onError: (e: Error) => void
) {
    const replacementsMap = replace(configSelect, textValue)

    const prompt = (
        finalPromote: BotTypes | undefined,
        prompt_ai: string
    ): string => {
        let updatedText = finalPromote?.aiPrompt

        const replacements = replacementsMap[finalPromote?.model || '']
        if (replacements) {
            replacements.forEach(({ key, value }) => {
                updatedText = updatedText?.replace(key, value)
            })
        } else {
            updatedText = finalPromote?.aiPrompt + ' , ' + prompt_ai
        }

        return updatedText || ''
    }

    const token = generateToken(secret)

    try {
        updateChats(dataGiver, lastMessage, params, userChat, user, setChats)
        await processBotResponse(
            prompt(finalPromote, promote_ai),
            token,
            secret,
            setChats,
            params,
            userChat,
            user,
            {
                point_token: generateToken(secret),
                setIsLoadingResponse,
                setUser
            }
        )
    } catch (error) {
        onError(error as Error)
    }
}
