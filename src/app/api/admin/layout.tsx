'use client'

import { Display } from '@/components/display'
import { ReactNode, useEffect } from 'react'

export default function AdminLayout({
    children
}: Readonly<{ children: ReactNode }>) {
    useEffect(() => {}, [])

    return <Display>{children}</Display>
}
