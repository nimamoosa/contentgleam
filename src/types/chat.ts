import { Models } from './chat_model'

export type Modes = 'pre' | 'receiver' | 'error' | 'success'

export type ChatMessageTypes = {
    role: 'bot' | 'user'
    content: string
    messageId: string
    mode: Modes
    timestamp: number
}

export type ChatTypes = {
    chatId: string
    model: Models
    messages: ChatMessageTypes[]
    user_info: {
        userId: string
        email: string
    }
    create_at: number
}
