import { ConfigTypes } from '@/types/config'

const replace = (configSelect: ConfigTypes, textValue: string) => {
    const replacementsMap: {
        [key: string]: { key: string; value: string }[]
    } = {
        'advanced-youtube-optimized-video': [
            {
                key: '**Video Length in Minutes**:',
                value: `**Video Length in Minutes**: ${
                    configSelect.time?.split(',')[0]
                }`
            },
            {
                key: '**Video Type**:',
                value: `**Video Type**: ${configSelect.video_type}`
            },
            {
                key: '**Video Topic**:',
                value: `**Video Topic**: ${textValue}`
            },
            {
                key: '**Target Audience**:',
                value: `**Target Audience**: ${configSelect.target_audience}`
            }
            // Add more replacements here as necessary
        ],

        'instagram-engagement-boost-strategies': [
            {
                key: '**Current Engagement Metrics**:',
                value: `**Current Engagement Metrics**: ${configSelect.eng_metrics}`
            },
            {
                key: '**Content Type**:',
                value: `**Content Type**: ${configSelect.content_type}`
            }
        ],

        'instagram-story-ideas-generator': [
            {
                key: '**Topic**:',
                value: `**Topic**: ${textValue}`
            }
        ],

        'instagram-post-generator': [
            {
                key: '**Keywords**:',
                value: `**Keywords**: ${textValue}`
            }
        ],

        'advanced-instagram-content-creator': [
            {
                key: '**Topic**:',
                value: `**Topic**: ${textValue}`
            },
            {
                key: '**Niche/Industry**:',
                value: `**Niche/Industry**: ${configSelect.niche}`
            },
            {
                key: '**Post Objective**:',
                value: `**Post Objective**: ${configSelect.post_obj}`
            },
            {
                key: '**Audience Profile**:',
                value: `**Audience Profile**: ${configSelect.audience_profile}`
            },
            {
                key: '**Content Theme**:',
                value: `**Content Theme**: ${configSelect.content_theme}`
            },
            {
                key: '**Boost Post**:',
                value: `**Boost Post**: ${configSelect.boost}`
            },
            {
                key: '**Post Tme**:',
                value: `**Post Time**: ${configSelect.add_time}`
            }
        ]

        // Define replacements for other models
    }

    return replacementsMap
}

export default replace
