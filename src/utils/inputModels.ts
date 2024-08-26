export const inputModels: {
    [key: string]: Array<{
        type: 'select' | 'input'
        placeholder: string
        name: string
        options?: string[]
    }>
} = {
    'advanced-youtube-optimized-video': [
        {
            type: 'input',
            placeholder: 'Time (min)',
            name: 'time'
        },
        {
            type: 'select',
            placeholder: 'Video Type',
            name: 'video_type',
            options: ['mp4', 'webm']
        },
        {
            type: 'input',
            placeholder: 'Target Audience',
            name: 'target_audience'
        }
    ],

    'instagram-engagement-boost-strategies': [
        {
            type: 'select',
            placeholder: 'Current Engagement Metrics',
            name: 'eng_metrics',
            options: [
                'likes',
                'comments',
                'shares',
                'views',
                'story replies',
                'story likes'
            ]
        },
        {
            type: 'select',
            placeholder: 'Content Type',
            name: 'content_type',
            options: ['photos', 'videos', 'reels', 'stories']
        }
    ],

    'advanced-instagram-content-creator': [
        {
            type: 'input',
            placeholder: 'The specific niche or industry related to the post',
            name: 'niche'
        },
        {
            type: 'input',
            placeholder: 'The goal you want to achieve with this post',
            name: 'post_obj'
        },
        {
            type: 'input',
            placeholder: 'The target audience characteristics',
            name: 'audience_profile'
        },
        {
            type: 'input',
            placeholder: 'The overall theme or mood of the post',
            name: 'content_theme'
        },
        {
            type: 'select',
            placeholder: 'add time?',
            name: 'add_time',
            options: ['yes', 'no']
        },
        {
            type: 'select',
            placeholder: 'boost post?',
            name: 'boost',
            options: ['yes', 'no']
        }
    ]
}
