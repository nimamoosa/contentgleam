import { BotTypes } from '@/types/bot'
import { ChatModelTypes, Models } from '@/types/chat_model'
import { Button, Card, CardFooter, CardHeader, Image } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BotCards({
    item,
    index,
    chatModel
}: {
    item: BotTypes
    index: number
    chatModel: ChatModelTypes
}) {
    const pathname = usePathname()

    const handleLink = (model_name: Models) => {
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

    return (
        <Card
            isFooterBlurred
            className={`w-[85%] h-[300px] ring-2 hover:scale-[1.05]`}
            key={index}>
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                    {item.is_available ? 'Available' : 'Unavailable'}
                </p>
                <h4 className="text-white font-medium bg-black/75 ring-2 px-2 transition-all duration-250 py-1 rounded mt-1 text-2xl">
                    {item.name}
                </h4>
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
                    href={`${pathname}/${handleLink(item.model)}`}
                    color="primary"
                    radius="full"
                    size="sm">
                    Try it
                </Button>
            </CardFooter>
        </Card>
    )
}
