'use client'

import { Container, Display } from '@/components/display'
import useCheckRew from '@/hooks/useCheckRew'
import useGetRewDetails from '@/hooks/useGetRewDetails'
import useSecretKey from '@/hooks/useSecretKey'
import { Skeleton } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

const Raw = () => {
    const searchParams = useSearchParams()

    const token = searchParams.get('t')
    const id = searchParams.get('id')
    const us = searchParams.get('us')

    const { error } = useCheckRew(token, id, us)
    // const sec = useSecretKey()
    // const { details } = useGetRewDetails(token, id, us, sec, error)

    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <Display className="mt-20 max-sm:mt-16">
            <Container
                justify="center"
                alignItems="center"
                className="w-full h-[85vh]">
                {/* {} */}
                {error ? (
                    <Container
                        justify="center"
                        alignItems="center"
                        flexDecoration="col"
                        className="p-3 rounded-lg bg-black/20">
                        <div className="text-4xl">
                            <p>Unknown Error 404</p>
                        </div>
                        <div className="text-center mt-4 text-red-200">
                            <p>page close after 4 seconds</p>
                        </div>
                    </Container>
                ) : (
                    <Container
                        flexDecoration="col"
                        justify="center"
                        alignItems="center"
                        className="w-[100%]">
                        <Skeleton className="w-[40%] h-[50vh] rounded-lg bg-white/30" />
                        <div>
                            <p className="mt-5">Checking Rewards data</p>
                        </div>
                    </Container>
                )}
            </Container>
        </Display>
    )
}

export default function RewPage() {
    return (
        <Suspense fallback={<div />}>
            <Raw />
        </Suspense>
    )
}
