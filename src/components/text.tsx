import { Colors } from '@/utils/color'
import React from 'react'

interface TextComponentProps {
    message: string
    id?: string
    className?: string
}

const TextComponent: React.FC<TextComponentProps> = ({
    message,
    id,
    className
}) => {
    const processMessage = (message: string) => {
        message = message.trim()

        const regex = /<([a-zA-Z]+)(?:-(\d+))?>((?:.|\n)*?)<\/\1(?:-\d+)?>/g
        let lastIndex = 0
        const parts: React.ReactNode[] = []

        // Update the replace function to correctly handle the match parameters
        message.replace(
            regex,
            (
                match: string,
                tag: string,
                variant: string | undefined,
                content: string,
                offset: number
            ) => {
                // Push the text before the match
                parts.push(message.substring(lastIndex, offset))

                let styleColor: string | undefined

                if (tag) {
                    if (variant) {
                        styleColor = Colors[tag.toLowerCase()]?.[variant]
                    } else {
                        styleColor = Colors[tag.toLowerCase()]?.['def']
                    }
                }

                // Push the matched element with the proper span
                if (styleColor) {
                    parts.push(
                        <span key={offset} style={{ color: styleColor }}>
                            {content}
                        </span>
                    )
                } else {
                    // If no color class is found, push the original match
                    parts.push(match)
                }

                // Update lastIndex to the end of the matched element
                lastIndex = offset + match.length
                return match // This return is required for replace
            }
        )

        // Push the remaining text after the last match
        if (lastIndex < message.length) {
            parts.push(message.substring(lastIndex))
        }

        return parts
    }

    return (
        <span id={id} className={className}>
            {processMessage(message)}
        </span>
    )
}

export default TextComponent
