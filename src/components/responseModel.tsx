import { ChatMessageTypes, ChatTypes } from '@/types/chat'
import { Container } from './display'
import { useAuth } from '@/contexts/authProvider'
import { inputModels } from '@/utils/inputModels'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Link,
    User
} from '@nextui-org/react'

interface props {
    item: ChatMessageTypes
    index: number
    userChat: ChatTypes
    chatTitle: string
}

export default function InitResponseModel({
    item,
    index,
    userChat,
    chatTitle
}: props) {
    const { user } = useAuth()

    const messagesLength = userChat.messages.length ?? 0
    const isLastIndex = index === messagesLength - 1

    return (
        <Container
            justify={item.role === 'user' ? 'end' : 'start'}
            alignItems="center"
            id={item.messageId}
            flexDecoration="row"
            className={`p-2 mt-3 ${
                isLastIndex
                    ? `mb-[150px] ${
                          inputModels[userChat.model]
                              ? 'max-sm:mb-[125px]'
                              : 'max-sm:mb-[100px]'
                      }`
                    : 'mb-4 max-sm:mb-2.5'
            } w-full`}
            key={index}>
            <Card
                className={`max-w-[680px] h-fit ${
                    item.role === 'bot' && 'border-[1.7px]'
                }`}>
                <CardHeader className="flex gap-3">
                    <div>
                        <User
                            name={
                                item.role === 'user'
                                    ? user.email
                                    : chatTitle + ' Bot'
                            }
                            description={
                                <Link
                                    href="https://twitter.com/jrgarciadev"
                                    size="sm"
                                    isExternal>
                                    {''}
                                </Link>
                            }
                            avatarProps={{
                                src:
                                    item.role === 'user'
                                        ? 'https://avatars.githubusercontent.com/u/30373425?v=4'
                                        : '/bot.png'
                            }}
                        />
                    </div>
                </CardHeader>
                <Divider />
                <CardBody
                    className={`whitespace-break-spaces ${
                        item.mode === 'error' ? 'text-red-200' : 'text-white'
                    }`}
                    dangerouslySetInnerHTML={{
                        __html: item.content
                    }}
                />

                {item.role === 'bot' && (
                    <>
                        <Divider />
                        <CardFooter className="flex flex-col items-center justify-start h-auto">
                            <div className="flex w-full">
                                <p>Points: </p>
                                <p>{user.point.points}</p>
                            </div>
                            <Divider className="mt-2 mb-2" />
                            <div>
                                <Button
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            item.content
                                        )
                                    }
                                    size="sm">
                                    Copy
                                </Button>
                            </div>
                        </CardFooter>
                    </>
                )}
            </Card>
        </Container>
    )
}
