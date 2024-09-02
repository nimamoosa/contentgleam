import postChatData from '@/functions/chatData'
import { AuthTypes } from '@/types/auth'
import { ChatTypes } from '@/types/chat'
import generateToken from '@/utils/token/token'
import { Dispatch, SetStateAction } from 'react'
import toast from '@/utils/toast'
import processMainFunction from '@/functions/processMainFunction'

// Base class for handling common functionalities
class BaseHandler {
    protected params: { chatId: string }
    protected userChat: ChatTypes | null | undefined
    protected promote_ai: string
    protected user: AuthTypes
    protected secret: string

    constructor(
        params: { chatId: string },
        userChat: ChatTypes | null | undefined,
        promote_ai: string,
        user: AuthTypes,
        secret: string
    ) {
        this.params = params
        this.userChat = userChat
        this.promote_ai = promote_ai
        this.user = user
        this.secret = secret
    }

    protected createArgArray<T extends unknown[]>(...args: T): T {
        return args
    }

    protected createApplyFunction() {
        return (
            func: (...args: any[]) => void,
            argArray: any[],
            callbackFn?: (json: any) => void
        ): void => {
            const combinedArgs = [...argArray, callbackFn].filter(Boolean)
            func(...combinedArgs)
        }
    }

    protected handleErrors(e: { message: string }): void {
        toast('error', e.message)
    }

    protected handleJsonErrors(e_json: { message: string }): void {
        toast('error', e_json.message)
    }
}

// Derived class for handling AI responses
class ResponseModelHandler extends BaseHandler {
    constructor(
        params: { chatId: string },
        userChat: ChatTypes | null | undefined,
        promote_ai: string,
        user: AuthTypes,
        secret: string
    ) {
        super(params, userChat, promote_ai, user, secret)
    }

    public async responseAImodel(
        setIsLoadingResponse: Dispatch<SetStateAction<boolean>>,
        setTextValue: (value: string) => void,
        setChats: Dispatch<SetStateAction<ChatTypes[]>>,
        configSelect: any,
        templates: any,
        setUser: Dispatch<SetStateAction<AuthTypes>>
    ): Promise<void> {
        setIsLoadingResponse(true)

        const applyFunction = this.createApplyFunction()
        applyFunction(
            this._1.bind(this),
            this.createArgArray(
                this.params,
                this.userChat,
                this.promote_ai,
                this.user,
                this.secret,
                this.enhancedResponseHandler(
                    setIsLoadingResponse,
                    setTextValue,
                    setChats,
                    configSelect,
                    templates,
                    setUser
                ),
                this.createJsonHandler(
                    this.handleJsonErrors.bind(this),
                    setIsLoadingResponse
                ),
                this.createErrorHandler(this.handleErrors.bind(this))
            )
        )
    }

    private enhancedResponseHandler(
        setIsLoadingResponse: Dispatch<SetStateAction<boolean>>,
        setTextValue: (value: string) => void,
        setChats: Dispatch<SetStateAction<ChatTypes[]>>,
        configSelect: any,
        templates: any,
        setUser: Dispatch<SetStateAction<AuthTypes>>
    ) {
        return (j: { data: ChatTypes[] }) => {
            const dataGiver = j.data.find(
                (i: ChatTypes) => i.chatId === this.params.chatId
            )
            setTextValue('')

            if (dataGiver) {
                const lastMessage =
                    dataGiver.messages[dataGiver.messages.length - 1]
                const finalPromote = templates.find(
                    (tmp: ChatTypes) => tmp.model === this.userChat?.model
                )

                // Log the processing of the main function
                processMainFunction(
                    dataGiver,
                    lastMessage,
                    this.params,
                    this.userChat,
                    this.user,
                    setChats,
                    configSelect,
                    setTextValue,
                    finalPromote,
                    this.promote_ai,
                    this.secret,
                    setIsLoadingResponse,
                    setUser
                )
            } else {
                console.warn('No data found for chatId:', this.params.chatId)
            }
        }
    }

    private createJsonHandler(
        jsonHandler: (e_json: { message: string }) => void,
        setLoading: Dispatch<SetStateAction<boolean>>
    ): (e_json: { message: string }) => void {
        return (e_json) => {
            jsonHandler(e_json)
            setLoading(false)
        }
    }

    private createErrorHandler(
        errorHandler: (e: { message: string }) => void
    ): (e: { message: string }) => void {
        return (e) => {
            this.handleErrors(e)
            errorHandler(e)
        }
    }

    private async _1(
        params: { chatId: string },
        userChat: ChatTypes | null | undefined,
        promote_ai: string,
        user: AuthTypes,
        secret: string,
        onSuccess: (json: { message: string; data: any }) => void,
        onReject: (e_json: { message: string }) => void
    ): Promise<void> {
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
                data: any
            }

            if (response.ok) {
                onSuccess(json)
            } else {
                onReject({ message: json.message })
            }
        } catch (error) {
            this.handleErrors({ message: (error as Error).message })
        }
    }
}

export default ResponseModelHandler
