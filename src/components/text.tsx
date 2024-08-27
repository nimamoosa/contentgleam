import { Colors } from '@/utils/color'
import React from 'react'
import classNames from 'classnames'
import { TagManager } from './common/tagManager'

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
    const tagManager = new TagManager()

    const processMessage = (message: string): React.ReactNode[] => {
        const regex = /<([a-zA-Z]+)(?:-(\d+))?>((?:.|\n)*?)<\/\1(?:-\d+)?>/g
        let lastIndex = 0
        const parts: React.ReactNode[] = []

        message.replace(
            regex,
            (
                match: string,
                tag: string,
                variant: string | undefined,
                content: string,
                offset: number
            ) => {
                // Add text before the match
                parts.push(message.substring(lastIndex, offset))

                // Process the nested content
                const processedContent = processMessage(content)

                // Get the styles and classnames for the current tag
                const tagStyle = tagManager.getTagStyle(tag)
                const styleColor = variant
                    ? Colors[tag.toLowerCase()]?.[variant]
                    : Colors[tag.toLowerCase()]?.['def']

                const combinedStyle = styleColor
                    ? { color: styleColor }
                    : undefined
                const combinedClassName = classNames(tagStyle?.className)

                // Combine everything into one wrapper element
                const Wrapper = tagStyle?.wrapper || 'span'

                parts.push(
                    <Wrapper
                        key={offset}
                        className={combinedClassName}
                        style={combinedStyle}>
                        {processedContent}
                    </Wrapper>
                )

                // Update lastIndex
                lastIndex = offset + match.length

                return match
            }
        )

        // Add any remaining text after the last match
        if (lastIndex < message.length) {
            parts.push(message.substring(lastIndex))
        }

        return parts
    }

    return (
        <span
            id={id}
            className={classNames('max-sm:whitespace-normal', className)}>
            {processMessage(message)}
        </span>
    )
}

export default TextComponent
