'use client'

import { Display } from '@/components/display'
import Footer from '@/components/footer'
import BlogItems from '@/constants/blogItems'
import { BlogItemsType } from '@/types/blog'
import {
    User,
    Link as NextUILink,
    Image,
    Divider,
    Skeleton
} from '@nextui-org/react'
import Link from 'next/link'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import { GoArrowUpRight } from 'react-icons/go'

interface props {
    params: {
        blogName: string
    }
}

export default ({ params }: props) => {
    const [blogDetails, setBlogDetails] = useState<BlogItemsType>()
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const DynamicPage = lazy(() =>
        import(`@/posts/${params.blogName}`).catch(() => {
            return import('@/posts/404')
        })
    )

    useEffect(() => {
        const findBlog = BlogItems.find((item) => item.link === params.blogName)

        findBlog ? setBlogDetails(findBlog) : setIsError(true)
        setIsLoading(false)
    }, [params])

    return (
        <Display className="relative z-20">
            {!isError ? (
                <article className="">
                    <meta
                        name="keywords"
                        content={blogDetails?.options?.meta}
                    />
                    <div className="w-full mt-12 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-start justify-start w-full">
                            <Link
                                href={'/blog'}
                                className="transition-all w-fit p-2 rounded-lg relative left-28 max-sm:left-0 text-gray-400/85 hover:bg-white/10">
                                <span className="mr-2">{'<'}</span>
                                <span>Back to blog</span>
                            </Link>
                        </div>
                        {isLoading ? (
                            <>
                                <div className="w-[80%] max-sm:w-[100%]">
                                    <div className="mt-11 *:ml-3 max-sm:*:ml-0">
                                        <div>
                                            <div className="max-sm:ml-3">
                                                {/* <span className="p-2 text-sm w-fit text-gray-400/85">{blogDetails?.createAt}</span> */}
                                            </div>
                                            <div className="mt-4">
                                                <div className="ml-3 max-w-[300px] w-full flex items-center gap-3">
                                                    <div>
                                                        <Skeleton
                                                            className="flex rounded-full w-12 h-12"
                                                            classNames={{
                                                                base: 'bg-white/40'
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="w-full flex flex-col gap-2">
                                                        <Skeleton
                                                            className="h-3 w-3/5 rounded-lg"
                                                            classNames={{
                                                                base: 'bg-white/40'
                                                            }}
                                                        />
                                                        <Skeleton
                                                            className="h-3 w-4/5 rounded-lg"
                                                            classNames={{
                                                                base: 'bg-white/40'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="ml-3 mt-2">
                                                    <Skeleton
                                                        className="w-[100px] h-[30px] rounded"
                                                        classNames={{
                                                            base: 'bg-white/40'
                                                        }}
                                                    />
                                                </div>
                                                <div className="mt-3 ml-3 max-sm:ml-0 max-sm:flex max-sm:items-center max-sm:justify-center">
                                                    <Skeleton
                                                        className="rounded-lg w-[700px] h-[500px]"
                                                        classNames={{
                                                            base: 'bg-white/40'
                                                        }}>
                                                        <div className="h-24 rounded-lg bg-default-300"></div>
                                                    </Skeleton>
                                                </div>

                                                <div className="mt-5 relative pb-4 max-sm:w-[95%] max-sm:ml-auto max-sm:mr-auto">
                                                    <Skeleton
                                                        className="w-[80%] h-[60vh] ml-3 rounded"
                                                        classNames={{
                                                            base: 'bg-white/40'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-[20rem] w-full ml-0">
                                    {blogDetails?.options?.show_categories ==
                                        true && (
                                        <div className="w-full flex flex-col mb-3 p-2 rounded bg-black/80">
                                            <div className="w-full h-[5vh] mb-5 flex items-center justify-center">
                                                <h4 className="text-xl text-white">
                                                    Categories
                                                </h4>
                                            </div>
                                            <Divider className="w-[80%] ml-auto mr-auto bg-white/60 mb-2" />
                                            <div className="w-full grid gap-3 grid-cols-3 p-2 text-white/75 font-light place-items-center max-sm:flex max-sm:flex-wrap max-sm:px-3">
                                                {blogDetails?.categories?.map(
                                                    (ctr, index) => {
                                                        return (
                                                            <Link
                                                                href={ctr.link}
                                                                className="text-violet-200 flex items-center justify-center transition-all hover:underline">
                                                                <span>
                                                                    {ctr.name}
                                                                </span>
                                                                <span className="text-[18px] ml-1">
                                                                    <GoArrowUpRight />
                                                                </span>
                                                            </Link>
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <Footer />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-[80%] max-sm:w-[100%]">
                                    <div className="mt-11 *:ml-3 max-sm:*:ml-0">
                                        <div>
                                            <div className="max-sm:ml-3">
                                                {/* <span className="p-2 text-sm w-fit text-gray-400/85">{blogDetails?.createAt}</span> */}
                                            </div>
                                            <div className="mt-4">
                                                <div className="ml-3">
                                                    <User
                                                        name={
                                                            blogDetails?.author
                                                        }
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
                                                            description:
                                                                'text-blue-400'
                                                        }}
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <h1 className="text-2xl mt-5 mb-5 font-semibold text-blue-400/90">
                                                        {
                                                            blogDetails?.page_title
                                                        }
                                                    </h1>
                                                </div>
                                                <div className="mt-3 ml-3 max-sm:ml-0 max-sm:flex max-sm:items-center max-sm:justify-center">
                                                    <Image
                                                        src={`/posts/${params.blogName}.png`}
                                                        className="w-[700px] max-h-[700px] max-sm:w-[350px] max-sm:max-h-[350px] ring-2 ring-offset-1"
                                                    />
                                                </div>

                                                <div className="relative bg-black/10 rounded-lg max-sm:w-full max-sm:ml-auto max-sm:mr-auto">
                                                    <Suspense>
                                                        <DynamicPage />
                                                    </Suspense>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-[20rem] w-full ml-0">
                                    {blogDetails?.options?.show_categories ==
                                        true && (
                                        <div className="w-full flex flex-col mb-3 p-2 rounded bg-black/80">
                                            <div className="w-full h-[5vh] mb-5 flex items-center justify-center">
                                                <h4 className="text-xl text-white">
                                                    Categories
                                                </h4>
                                            </div>
                                            <Divider className="w-[80%] ml-auto mr-auto bg-white/60 mb-2" />
                                            <div className="w-full grid gap-3 grid-cols-3 p-2 text-white/75 font-light place-items-center max-sm:flex max-sm:flex-wrap max-sm:px-3">
                                                {blogDetails?.categories?.map(
                                                    (ctr, index) => {
                                                        return (
                                                            <Link
                                                                href={ctr.link}
                                                                className="text-violet-200 flex items-center justify-center transition-all hover:underline">
                                                                <span>
                                                                    {ctr.name}
                                                                </span>
                                                                <span className="text-[18px] ml-1">
                                                                    <GoArrowUpRight />
                                                                </span>
                                                            </Link>
                                                        )
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <div>{/* <Footer /> */}</div>
                                </div>
                            </>
                        )}
                    </div>
                </article>
            ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-xl">
                    404 blog not found
                </div>
            )}
        </Display>
    )
}
