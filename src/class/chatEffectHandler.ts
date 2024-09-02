// Import dependencies
import postChatData from '@/functions/chatData'
import replace from '@/constants/replacements'
import processBotResponse from '@/functions/processBot'
import updateChats from '@/functions/updateChats'
import { AuthTypes } from '@/types/auth'
import { BotTypes } from '@/types/bot'
import { ChatMessageTypes, ChatTypes } from '@/types/chat'
import { ConfigTypes } from '@/types/config'
import generateToken from '@/utils/token/token'
import { Dispatch, SetStateAction } from 'react'
import { ModelTypes } from '@/types/chat_model'

// ChatDataHandler class
class ChatDataHandler {
    private params: { chatId: string }
    private findChat: ModelTypes
    private textValue: string
    private user: AuthTypes
    private secret: string

    constructor(
        params: { chatId: string },
        findChat: ModelTypes,
        textValue: string,
        user: AuthTypes,
        secret: string
    ) {
        this.params = params
        this.findChat = findChat
        this.textValue = textValue
        this.user = user
        this.secret = secret
    }

    public async sendData(
        onSuccess: (json: {
            message: string
            data: string | object | any
        }) => void,
        onReject: (e_json: { error: string }) => void,
        onError: (err: Error) => void
    ) {
        try {
            const response = await postChatData(
                {
                    chatId: this.params.chatId,
                    model: this.findChat.model_name,
                    mode: 'success',
                    content: this.textValue,
                    role: 'user',
                    userId: this.user.userId
                },
                generateToken(this.secret),
                this.secret
            )
            const json = (await response.json()) as {
                message: string
                data: string | object
            }

            if (response.ok || response.status === 200) {
                onSuccess(json)
            } else {
                onReject({ error: json.message })
            }
        } catch (error) {
            onError(error as Error)
        }
    }
}

// ChatResponseHandler class
class ChatResponseHandler {
    private configSelect: ConfigTypes
    private textValue: string
    private dataGiver: ChatTypes
    private lastMessage: ChatMessageTypes
    private params: { chatId: string }
    private userChat: ChatTypes | undefined | null
    private user: AuthTypes
    private setChats: Dispatch<SetStateAction<ChatTypes[]>>
    private finalPromote: BotTypes | undefined
    private secret: string
    private setIsLoadingResponse: Dispatch<SetStateAction<boolean>>
    private setUser: Dispatch<SetStateAction<AuthTypes>>

    constructor(
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
        setUser: Dispatch<SetStateAction<AuthTypes>>
    ) {
        this.configSelect = configSelect
        this.textValue = textValue
        this.dataGiver = dataGiver
        this.lastMessage = lastMessage
        this.params = params
        this.userChat = userChat
        this.user = user
        this.setChats = setChats
        this.finalPromote = finalPromote
        this.secret = secret
        this.setIsLoadingResponse = setIsLoadingResponse
        this.setUser = setUser
    }

    private getPrompt(
        finalPromote: BotTypes | undefined,
        prompt_ai: string
    ): string {
        let updatedText = finalPromote?.aiPrompt || ''

        const replacements = replace(this.configSelect, this.textValue)[
            finalPromote?.model || ''
        ]
        if (replacements) {
            replacements.forEach(({ key, value }) => {
                updatedText = updatedText.replace(key, value)
            })
        } else {
            updatedText += ' , ' + prompt_ai
        }

        return updatedText || ''
    }

    public async processResponse(onError: (e: Error) => void) {
        try {
            updateChats(
                this.dataGiver,
                this.lastMessage,
                this.params,
                this.dataGiver,
                this.user,
                this.setChats
            )

            await processBotResponse(
                this.getPrompt(this.finalPromote, this.textValue),
                generateToken(this.secret),
                this.secret,
                this.setChats,
                this.params,
                this.dataGiver,
                this.user,
                {
                    point_token: generateToken(this.secret),
                    setIsLoadingResponse: this.setIsLoadingResponse,
                    setUser: this.setUser
                }
            )
        } catch (error) {
            onError(error as Error)
        }
    }
}
