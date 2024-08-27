'use client'

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Image,
    Input,
    Link as NextUILink,
    Pagination,
    User
} from '@nextui-org/react'
import Link from 'next/link'
import { BiSearch } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import BlogItems from '@/constants/blogItems'
import { Display } from '@/components/display'

const ITEMS_PER_PAGE = 6

const BlogPage = () => {
    const blogItems = BlogItems
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [transitioning, setTransitioning] = useState<boolean>(false)
    const totalPages = Math.ceil(blogItems.length / ITEMS_PER_PAGE)

    // Effect for updating current page based on URL hash
    useEffect(() => {
        const hash = window.location.hash
        if (hash.startsWith('#pg_')) {
            const page = parseInt(hash.replace('#pg_', ''), 10)
            if (!isNaN(page) && page >= 1 && page <= totalPages) {
                setCurrentPage(page)
            }
        }
    }, [totalPages])

    // Effect for scrolling to the top of the page
    useEffect(() => {
        if (!transitioning) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [currentPage, transitioning])

    // Effect for handling hash changes in the URL
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash
            if (hash.startsWith('#pg_')) {
                const page = parseInt(hash.replace('#pg_', ''), 10)
                if (!isNaN(page) && page >= 1 && page <= totalPages) {
                    setTransitioning(true)
                    setCurrentPage(page)
                    setTimeout(() => {
                        setTransitioning(false)
                    }, 300)
                }
            }
        }

        window.addEventListener('hashchange', handleHashChange)
        return () => {
            window.removeEventListener('hashchange', handleHashChange)
        }
    }, [totalPages])

    // Paginate blog items based on the current page
    const paginatedItems = blogItems.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    // Handle page change with URL update and scrolling
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setTransitioning(true)
            setCurrentPage(page)
            window.history.pushState(null, '', `#pg_${page}`)
            setTimeout(() => {
                setTransitioning(false)
            }, 300)
        }
    }

    return (
        <Display className="h-auto relative p-2 z-20 mt-0">
            <div className="flex flex-col items-center justify-center">
                <div className="relative top-5 w-[25%] max-sm:w-[90%]">
                    <Input
                        isClearable
                        radius="lg"
                        classNames={{
                            label: 'text-white dark:text-white/90',
                            input: [
                                'bg-transparent',
                                'text-black/90 dark:text-white/90',
                                'placeholder:text-default-900/70 dark:placeholder:text-white/60'
                            ],
                            base: 'mt-5',
                            innerWrapper: 'bg-transparent',
                            inputWrapper: [
                                'shadow-xl',
                                'bg-default-200/50',
                                'dark:bg-default/60',
                                'backdrop-blur-xl',
                                'backdrop-saturate-200',
                                'hover:bg-default-200/70',
                                'dark:hover:bg-default/70',
                                'group-data-[focus=true]:bg-default-200/50',
                                'dark:group-data-[focus=true]:bg-default/60',
                                '!cursor-text'
                            ]
                        }}
                        placeholder="Type to search..."
                        startContent={
                            <BiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-white pointer-events-none flex-shrink-0" />
                        }
                    />
                </div>
            </div>

            <div
                className={`w-[90%] ml-auto mr-auto grid grid-flow-row grid-cols-3 place-items-center gap-4 justify-center p-5 rounded-lg mt-14 max-sm:grid-cols-1 max-sm:w-full transition-transform ${
                    transitioning ? 'transform opacity-0' : 'opacity-100'
                }`}>
                {paginatedItems.length > 0 ? (
                    paginatedItems.map((item, index) => (
                        <article key={index} className="mb-10">
                            <Card className="max-w-[400px] max-h-[700px] ring-2 bg-stripe-gradient transition-all duration-300 ease-soft-spring bg-purple-600/10">
                                <CardHeader className="flex gap-3 items-center justify-center">
                                    <Link
                                        href={`blog/${item.link}`}
                                        className="flex items-center justify-center font-semibold text-xl text-blue-500 transition-all duration-100 hover:underline">
                                        <span>{item.title}</span>
                                    </Link>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                    <div className="object-cover mb-2">
                                        <Image
                                            loading="lazy"
                                            src={`/posts/${item.link}.png`}
                                            width={600}
                                            height={340}
                                            className="shadow-lg max-sm:max-h-[280px] shadow-transparent/50"
                                        />
                                    </div>
                                    <div className="text-default-500 text-large font-normal mt-4 w-full overflow-y-auto text-start">
                                        <p className="truncate">
                                            {item.description}
                                        </p>
                                    </div>
                                </CardBody>
                                <Divider />
                                <CardFooter className="flex flex-col">
                                    <div className="w-full flex items-center justify-between">
                                        <div>
                                            <User
                                                name={item.author}
                                                description={
                                                    <NextUILink
                                                        href="https://twitter.com/jrgarciadev"
                                                        size="sm"
                                                        isExternal>
                                                        @jrgarciadev
                                                    </NextUILink>
                                                }
                                                avatarProps={{
                                                    src: 'https://avatars.githubusercontent.com/u/30373425?v=4'
                                                }}
                                                classNames={{
                                                    name: 'text-white',
                                                    description: 'text-blue-400'
                                                }}
                                            />
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            <span suppressHydrationWarning>
                                                {item.createdAt}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 w-full flex items-center justify-center">
                                        <Button
                                            variant="faded"
                                            as={Link}
                                            href={`blog/${item.link}`}
                                            className="w-[90%]">
                                            خوندن این مقاله
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </article>
                    ))
                ) : (
                    <div className="text-white text-lg">No posts available</div>
                )}
            </div>

            <div className="flex justify-center items-center fixed w-full h-auto bg-transparent z-50 bottom-0 right-0 mt-10 transition-transform duration-300 ease-in-out">
                <div className="flex items-center justify-center w-fit h-[7vh] p-2 mb-3 rounded-lg bg-purple-300">
                    <Pagination
                        showShadow
                        total={totalPages}
                        color="secondary"
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </Display>
    )
}

export default BlogPage
