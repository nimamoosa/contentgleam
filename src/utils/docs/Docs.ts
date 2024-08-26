import { EnumModels } from '@/enum/Models'
import { Models } from '@/types/chat_model'

export type DosType = {
    label: string
    items: { title: string; link: Models | string }[]
}

const modelLinks = Object.keys(EnumModels)

export const Docs: DosType[] = [
    {
        label: 'Guide',
        items: [
            {
                title: 'Review',
                link: 'review'
            }
        ]
    },
    {
        label: 'Free Models',
        items: modelLinks.map((model, i) => ({
            title: model,
            link: EnumModels[model as keyof typeof EnumModels]
        }))
    }
]
