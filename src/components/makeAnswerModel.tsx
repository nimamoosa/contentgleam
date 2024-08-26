import { Spinner } from '@nextui-org/react'
import { Container } from './display'
import TextComponent from './text'
import { ChatMessageTypes } from '@/types/chat'

interface props {
    index: number
    item: ChatMessageTypes
}

export default function MakeAnswerModel({ index, item }: props) {
    return (
        <Container
            justify={'start'}
            alignItems="center"
            className="p-2 w-full whitespace-break-spaces mb-[120px]"
            key={index}>
            <Container
                justify="center"
                alignItems="center"
                className="w-fit px-3 py-2 mt-3 mb-5 ring-2 rounded-lg bg-white/10">
                <Spinner>
                    <TextComponent
                        message={`${
                            item.mode === 'pre'
                                ? '<orange-200>Response Model....</orange-200>'
                                : item.mode === 'receiver'
                                ? '<blue-300>AI</blue-300> Generating....'
                                : ''
                        }`}
                    />
                </Spinner>
            </Container>
        </Container>
    )
}
