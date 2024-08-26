import replace from '@/constant/replacements'
import processBotResponse from '@/functions/processBot'
import updateChats from '@/functions/updateChats'
import { AuthTypes } from '@/types/auth'
import { BotTypes } from '@/types/bot'
import { ChatMessageTypes, ChatTypes } from '@/types/chat'
import { ConfigTypes } from '@/types/config'
import generateToken from '@/utils/token/token'
import { Dispatch, SetStateAction } from 'react'

export default async function f_2(
    configSelect: ConfigTypes,
    textValue: string,
    dataGiver: ChatTypes,
    lastMessage: ChatMessageTypes,
    params: { chatId: string },
    userChat: ChatTypes | undefined | null,
    user: AuthTypes,
    setChats: Dispatch<SetStateAction<ChatTypes[]>>,
    finalPromote: BotTypes | undefined,
    secret: string,
    setIsLoadingResponse: Dispatch<SetStateAction<boolean>>,
    setUser: Dispatch<SetStateAction<AuthTypes>>,
    onError: (e: Error) => void
) {
    try {
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

        updateChats(dataGiver, lastMessage, params, dataGiver, user, setChats)

        await processBotResponse(
            prompt(finalPromote, textValue),
            generateToken(secret),
            secret,
            setChats,
            params,
            dataGiver,
            user,
            {
                point_token: generateToken(secret),
                setIsLoadingResponse,
                setUser
            }
        )
    } catch (error) {
        return onError(error as Error)
    }
}
