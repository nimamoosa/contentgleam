'use client'

import { Button, Card, CardFooter, CardHeader, Image } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { useChatModel } from '@/contexts/chat_model'
import { Models } from '@/types/chat_model'
import TemplatesAI from '@/utils/AI/Templates'
import Link from 'next/link'
import { Container } from '@/components/display'
import { useRef, useState } from 'react'
import { BotTypes } from '@/types/bot'
import { Points } from '@/enum/Points'
import { EnumModels } from '@/enum/Models'
import { TbStars } from 'react-icons/tb'

export default function DashboardPage() {
    const { chatModel } = useChatModel()
    const [items, setItems] = useState<BotTypes[]>([])
    const [tabKey, setTabKey] = useState<
        'all' | 'blog' | 'website' | 'youtube'
    >('all')
    const pathname = usePathname()
    // const router = useRouter();
    // const searchParams = useSearchParams();
    const containerRef = useRef<HTMLDivElement | null>(null)

    // Initialize tabKey based on URL query parameter
    // useEffect(() => {
    //   const filter = searchParams.get("f");
    //   if (filter && ["all", "blog", "website", "youtube"].includes(filter)) {
    //     setTabKey(filter as "all" | "blog" | "website" | "youtube");
    //   }
    // }, [searchParams]);

    // Update items and URL based on tabKey
    // useEffect(() => {
    //   const filterItems = () => {
    //     if (tabKey === "all") {
    //       setItems(TemplatesAI());
    //     } else {
    //       const filteredItems = TemplatesAI().filter(
    //         (tai) => tai.category === tabKey
    //       );
    //       setItems(filteredItems);
    //     }
    //   };

    //   filterItems();
    //   router.push(`?f=${tabKey}`);
    // }, [tabKey, router]);

    const handleLink = (model_name: Models, botTitle: string): string => {
        if (chatModel && chatModel.models && chatModel.models.length !== 0) {
            const findChatId = chatModel.models.find(
                (model) => model.model_name === model_name
            )

            if (findChatId) {
                return `chat/${findChatId.chatId}`
            }
        }

        return `chat?model=${model_name}`
    }

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'blog', label: 'Blog' },
        { id: 'website', label: 'Website' },
        { id: 'youtube', label: 'Youtube' }
    ]

    const modelKeys = (item: BotTypes) =>
        Object.keys(EnumModels).find(
            (md) => EnumModels[md as keyof typeof EnumModels] == item.model
        )

    return (
        <div aria-live="polite" className="w-[100%] mb-5">
            <Container>
                <div ref={containerRef} />

                <div className="w-full h-auto min-h-dvh grid grid-cols-3 justify-items-center gap-14 mb-10 p-3 mt-20 max-sm:grid-cols-1 max-md:grid-cols-2 max-[1020px]:grid-cols-2">
                    {TemplatesAI().map((item, index) => (
                        <Card
                            isFooterBlurred
                            className={`w-[85%] h-[300px] shadow-lg shadow-black hover:scale-[1.05]`}
                            key={index}>
                            <CardHeader className="absolute z-10 top-1 flex items-start justify-between">
                                <div>
                                    <p className="text-tiny text-white/60 uppercase font-bold">
                                        {item.is_available
                                            ? 'Available'
                                            : 'Unavailable'}
                                    </p>
                                    <h5 className="text-white font-medium bg-black/75 ring-2 px-2 transition-all duration-250 py-1 rounded mt-1 text-xl">
                                        {item.name}
                                    </h5>
                                </div>
                                <div className="bg-black ml-5 rounded-lg">
                                    <span className="flex items-center p-1.5">
                                        <TbStars className="mr-2" />
                                        <span className="mr-1">
                                            {
                                                Points[
                                                    modelKeys(
                                                        item
                                                    ) as keyof typeof Points
                                                ]
                                            }
                                        </span>
                                    </span>
                                </div>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Card example background"
                                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                                src={item.icon}
                            />
                            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                                <div className="w-[80%]">
                                    <p className="text-black text-tiny truncate-custom">
                                        {item.desc}
                                    </p>
                                </div>
                                <Button
                                    className="text-tiny"
                                    as={Link}
                                    href={`${pathname}/${handleLink(
                                        item.model,
                                        item.name
                                    )}`}
                                    color="primary"
                                    radius="full"
                                    size="sm">
                                    Try it
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* <div className="w-full bg-transparent fixed bottom-2 z-50 right-0 flex items-center justify-center">
          <Tabs
            selectedKey={tabKey}
            onSelectionChange={(key) => {
              if (key !== tabKey) {
                setTabKey(key as "all" | "blog" | "website" | "youtube");
              }
            }}
            aria-label="Dynamic tabs"
            items={tabs}
          >
            {(item) => <Tab key={item.id} title={item.label}></Tab>}
          </Tabs>
        </div> */}
            </Container>
            {/* <Footer /> */}
        </div>
    )
}
