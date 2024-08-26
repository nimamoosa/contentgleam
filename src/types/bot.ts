import { Models } from './chat_model'

export type BotTypes = {
    name: string
    desc: string
    category: string
    aiPrompt: string
    model: Models
    icon: string
    is_available: boolean
    display_desc?: string
    input_label: string
}
