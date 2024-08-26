import { useEffect, useState } from 'react'

interface ChatModel {
    chatId: string
    title: string
}

const useChatModelHook = (
    chatModel: { models: ChatModel[] } | null,
    params: { chatId: string }
) => {
    const [chatTitle, setChatTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        const findModel = chatModel?.models.find(
            (md) => md.chatId === params.chatId
        )
        if (!findModel) return
        setChatTitle(findModel.title)
    }, [chatModel])

    return { chatTitle, error, setError }
}

export default useChatModelHook
