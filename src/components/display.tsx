import classNames from 'classnames'
import React, { forwardRef, ReactNode } from 'react'

interface DisplayProps extends React.HTMLProps<HTMLDivElement> {
    title?: string
    description?: string
    overflow?: boolean
    mt?: boolean
}

interface GridProps extends React.HTMLProps<HTMLDivElement> {
    title?: string
    description?: string
    grid_flow?: 'row' | 'col' | 'row-dense' | 'col-dense'
    grid_cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 12
    place_items?: 'center' | 'end' | 'start' | 'baseline' | 'stretch'
    place_content?:
        | 'center'
        | 'end'
        | 'start'
        | 'between'
        | 'around'
        | 'evenly'
        | 'baseline'
        | 'stretch'
    justify_items?: 'center' | 'end' | 'start' | 'baseline' | 'stretch'
}

interface FixeProps extends React.HTMLProps<HTMLDivElement> {
    title?: string
    description?: string
    backgroundColor?: string
    position?: 'fixed' | 'absolute'
}

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode
    title?: string
    description?: string
    justify?:
        | 'center'
        | 'end'
        | 'start'
        | 'between'
        | 'around'
        | 'evenly'
        | 'baseline'
        | 'stretch'
    alignItems?: 'center' | 'end' | 'start' | 'baseline' | 'stretch'
    flexDecoration?: 'col' | 'row' | 'col-reverse' | 'row-reverse'
}

const Display: React.FC<DisplayProps> = ({
    title,
    description,
    children,
    className,
    mt = true,
    overflow,
    ...rest
}) => {
    return (
        <div
            aria-label={title || 'Main Content'}
            aria-describedby={description || undefined}
            aria-live="polite"
            aria-hidden={false}
            role="main"
            className={classNames(
                className,
                'w-full h-auto text-white',
                'max-sm:w-[97%] max-sm:text-wrap max-sm:whitespace-break-spaces max-sm:ml-auto max-sm:mr-auto max-sm:bg-transparent/5 *:blog'
            )}
            {...rest}>
            {children}
        </div>
    )
}

const Grid: React.FC<GridProps> = ({
    title,
    description,
    grid_flow,
    grid_cols,
    place_items,
    place_content,
    justify_items,
    children,
    className,
    ...rest
}) => {
    return (
        <div
            aria-label={title || 'Grid Content'}
            aria-describedby={description || undefined}
            aria-live="polite"
            aria-hidden={false}
            role="grid"
            className={classNames(
                className,
                `w-full h-fit grid gap-10 grid-cols-${grid_cols} grid-flow-${grid_flow} place-items-${place_items} place-content-${place_content} justify-items-${justify_items} text-white p-2`,
                'max-sm:w-[97%] max-sm:text-wrap max-sm:whitespace-break-spaces max-sm:ml-auto max-sm:mr-auto *:blog',
                'max-sm:grid-cols-1 max-sm:gap-x-6 max-sm:gap-y-10'
            )}
            {...rest}>
            {children}
        </div>
    )
}

const Fixed: React.FC<FixeProps> = ({
    title,
    description,
    className,
    backgroundColor,
    position,
    children,
    ...rest
}) => {
    return (
        <div
            aria-label={title || 'Fixed Content'}
            aria-describedby={description || undefined}
            aria-live="polite"
            aria-hidden={false}
            role="main"
            className={classNames(
                className,
                `${
                    position || 'fixed'
                } w-[100%] h-full text-white p-2 bg-${backgroundColor}`,
                `max-sm:w-[97%] max-sm:text-wrap max-sm:whitespace-break-spaces max-sm:bg-${backgroundColor} max-sm:h-svh *:blog`,
                'max-sm:grid-cols-1 max-sm:gap-x-6 max-sm:gap-y-10'
            )}
            {...rest}>
            {children}
        </div>
    )
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
    (
        {
            children,
            title,
            description,
            className,
            alignItems,
            justify,
            flexDecoration,
            ...rest
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                aria-label={title || 'Main Container'}
                aria-describedby={description || undefined}
                aria-live="polite"
                aria-hidden={false}
                role="main"
                className={classNames(
                    className,
                    `flex flex-${flexDecoration} items-${alignItems} justify-${justify} text-white`,
                    'max-sm:text-wrap max-sm:whitespace-break-spaces *:blog'
                )}
                {...rest}>
                {children}
            </div>
        )
    }
)

Container.displayName = 'Container'

export { Display, Grid, Fixed, Container }
