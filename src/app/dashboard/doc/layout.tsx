'use client'

import { Container, Display } from '@/components/display'
import { Docs } from '@/utils/docs/Docs'
import {
    Accordion,
    AccordionItem,
    Listbox,
    ListboxItem,
    Selection
} from '@nextui-org/react'
import Link from 'next/link'
import React, { ReactNode, useEffect, useState } from 'react'
import { BsDot } from 'react-icons/bs'

export default function DocsPage({
    children
}: Readonly<{ children: ReactNode }>) {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
        new Set(['0', '1'])
    )

    return (
        <Display className="flex">
            <Container className="w-[20%]">
                <aside className="px-1 py-1 w-full h-[100vh] overflow-y-auto bg-purple-800/40">
                    <Accordion variant="light">
                        {Docs.map((item, index) => (
                            <AccordionItem key={index} title={item.label}>
                                <div className="w-full max-w-[280px] rounded-small">
                                    <Listbox
                                        key={`${item.items.length}-${index}`}
                                        color="default"
                                        classNames={{
                                            base: 'border-none -mt-5'
                                        }}>
                                        {item.items.map((it, idx) => (
                                            <ListboxItem
                                                startContent={<BsDot />}
                                                as={Link}
                                                title={it.title}
                                                href={`/dashboard/doc/${it.link}`}
                                                classNames={{
                                                    base: 'data-[hover=true]:bg-transparent -ml-2'
                                                }}
                                                key={idx}></ListboxItem>
                                        ))}
                                    </Listbox>
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </aside>
            </Container>

            <Container className="p-1 m-1">{children}</Container>
        </Display>
    )
}
