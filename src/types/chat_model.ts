export type Models =
    | 'youtube-tag'
    | 'youtube-seo-optimizer'
    | 'youtube-seo-optimize-content'
    | 'advanced-youtube-optimized-video'
    | 'instagram-post-generator'
    | 'instagram-story-ideas-generator'
    | 'instagram-engagement-boost-strategies'
    | 'advanced-instagram-content-creator'

export type ChatModelLimitTypes = {
    limit_reached: number
    limit_: number
    reset_at: number
    remaining: number // Add this field to represent the remaining limit
}

export type ModelTypes = {
    title: string
    chatId: string
    model_name: Models
    limits: ChatModelLimitTypes
}

export type ChatModelTypes = {
    userId: string
    email: string
    models: ModelTypes[]
}
