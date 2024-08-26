import { ChatTypes } from '@/types/chat'
import MakeAnswerModel from './makeAnswerModel'
import InitResponseModel from './responseModel'

export default function UserMessage({
    userChat,
    chatTitle
}: {
    userChat: ChatTypes | null
    chatTitle: string
}) {
    return userChat?.messages.map((item, index) => {
        return item.mode === 'pre' || item.mode === 'receiver' ? (
            <MakeAnswerModel index={index} item={item} key={index} />
        ) : (
            <InitResponseModel
                chatTitle={chatTitle}
                index={index}
                item={item}
                userChat={userChat}
                key={index}
            />
        )
    })
}
