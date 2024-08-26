import { Image } from '@nextui-org/react'
import { FaInstagram, FaTwitter } from 'react-icons/fa'
import TextComponent from './text'

export default function Footer() {
    const footerIconItems = [
        {
            name: 'Instagram',
            link: '#',
            icon: <FaInstagram />
        },
        {
            name: 'Twitter',
            link: '#',
            icon: <FaTwitter />
        }
    ]

    const footerItems = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'About',
            link: '/about'
        },
        {
            name: 'Terms Of Use',
            link: '/terms'
        },
        {
            name: 'Services',
            link: '/shop'
        },
        {
            name: 'Auth',
            link: '/auth'
        },
        {
            name: 'Blog',
            link: '#'
        }
    ]

    return (
        <footer className="w-full p-2" style={{ backgroundColor: 'black' }}>
            <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:px-8">
                <div
                    className="flex items-center justify-around w-[7%] max-sm:w-[100%] max-sm:justify-center"
                    dir="ltr">
                    <Image
                        src="/favicon.ico"
                        className="mr-3"
                        width={30}
                        height={30}
                    />
                    <span className="text-medium font-medium text-white max-sm:ml-3">
                        WordWhiz
                    </span>
                </div>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 p-3 mt-[1.5rem]">
                    {footerItems.map((items, index) => {
                        return (
                            <a
                                className="relative ml-2 inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-small no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-500"
                                href={items.link}
                                rel="noopener noreferrer"
                                role="link"
                                key={index}>
                                {items.name}
                            </a>
                        )
                    })}
                </div>

                <div className="flex justify-center gap-x-4 p-2 mt-[1.5rem] mb-[.5rem]">
                    {footerIconItems.map((items, index) => {
                        return (
                            <a
                                className="relative inline-flex items-center ml-2 mr-2 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity text-default-400"
                                href={items.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                role="link"
                                key={`${items.icon}-${index}`}>
                                <span className="sr-only">{items.name}</span>
                                {items.icon}
                            </a>
                        )
                    })}
                </div>
                <span
                    aria-hidden="true"
                    className="w-px h-px block mt-2 mb-1"></span>
                <p
                    className="mt-1 text-center text-small text-default-400"
                    dir="ltr">
                    <TextComponent message="© 2024 <purple-300>WordWhiz</purple-300> Inc. All rights reserved." />
                </p>
            </div>
        </footer>
    )
}
