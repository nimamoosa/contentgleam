import React from 'react'
import TextComponent from './text'
import classNames from 'classnames'

interface BlogComponentsProps {
    children: React.ReactNode
    dir?: 'rtl' | 'ltr'
}

interface BlogBoxComponentsProps extends React.HTMLProps<HTMLDivElement> {
    content: string
    textClassName?: string
}

interface BlogSectionComponentsProps extends React.HTMLProps<HTMLDivElement> {
    className?: string
}

interface BlogBoxRegComponentsProps extends React.HTMLProps<HTMLDivElement> {
    wrapperClassName?: string
    className?: string
    title: string
}

interface BlogContainerComponentsProps extends React.HTMLProps<HTMLDivElement> {
    className?: string
}

const Blog: React.FC<BlogComponentsProps> = ({ children, dir = 'rtl' }) => {
    return (
        <article
            aria-label="g-client blog"
            key={'blog-gclient'}
            about="blog"
            role="article"
            lang="fa"
            className={`w-full h-full mt-16 text-white p-1.5 max-sm:text-wrap max-sm:whitespace-break-spaces max-sm:mt-7`}
            dir={dir}>
            {children}
        </article>
    )
}

const BlogBox: React.FC<BlogBoxComponentsProps> = ({
    content,
    className,
    textClassName
}) => {
    return (
        <div
            className={classNames(
                className,
                'pb-4 pt-4 px-2 py-2 text-pretty rounded-lg shadow-2xl mb-5 mt-5 shadow-white/10 bg-white/10'
            )}
            role="dialog"
            aria-label={'blog-box'}
            aria-live="polite"
            aria-modal={true}
            aria-labelledby="dialogTitle"
            aria-describedby="dialogDescription">
            <span className={classNames(textClassName)} id="dialogTitle">
                <TextComponent message={content} id="dialogDescription" />
            </span>
        </div>
    )
}

const BlogSection: React.FC<BlogSectionComponentsProps> = ({
    className,
    children
}) => {
    return (
        <div
            className={classNames(className, 'pb-4 pt-4 px-2 py-2 text-pretty')}
            role="article"
            aria-label={'blog-sections'}
            aria-live="polite"
            aria-modal={true}
            aria-labelledby="dialogTitle"
            aria-describedby="dialogDescription">
            {children}
        </div>
    )
}

const BlogContainer: React.FC<BlogContainerComponentsProps> = ({
    className,
    children
}) => {
    return (
        <div
            className={classNames(className, 'p-1 text-pretty w-[95%]')}
            role="contentinfo"
            aria-label={'blog-container'}
            aria-live="polite"
            aria-modal={true}
            aria-labelledby="dialogTitle"
            aria-describedby="dialogDescription">
            {children}
        </div>
    )
}

const BlogBoxReg: React.FC<BlogBoxRegComponentsProps> = ({
    className,
    wrapperClassName,
    title,
    children
}) => {
    return (
        <div
            className={classNames(wrapperClassName, 'p-2 text-pretty')}
            role="article"
            aria-label={'blog-sections'}
            aria-live="polite"
            aria-modal={true}
            aria-labelledby="dialogTitle"
            aria-describedby="dialogDescription">
            <div className="w-full border-b-2 pb-2">
                <TextComponent
                    className="text-3xl text-balance"
                    message={`<bold>${title}</bold>`}
                />
            </div>
            <div className="border-r-[3px] border-r-pink-300/80">
                <div className={classNames(className, 'p-2')}>{children}</div>
            </div>
        </div>
    )
}

export { Blog, BlogBox, BlogSection, BlogContainer, BlogBoxReg }
