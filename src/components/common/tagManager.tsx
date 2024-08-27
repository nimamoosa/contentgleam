enum TagType {
    Bold = 'bold',
    SemiBold = 'semi'
}

export class TagManager {
    private tagStyles: {
        [key: string]: {
            className: string
            wrapper: keyof JSX.IntrinsicElements
        }
    }

    constructor() {
        this.tagStyles = {
            [TagType.Bold]: {
                className: 'font-bold text-white',
                wrapper: 'span'
            },

            [TagType.SemiBold]: {
                className: 'font-semibold text-white',
                wrapper: 'span'
            }
        }
    }

    getTagStyle(tag: string) {
        return this.tagStyles[tag.toLowerCase()] || null
    }
}
