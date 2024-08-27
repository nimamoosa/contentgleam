import { useAuth } from '@/contexts/authProvider'
import { useChatModel } from '@/contexts/chat_model'
import { Models } from '@/types/chat_model'

const handleLink = (model: Models) => {
    const { chatModel } = useChatModel()
    const { user } = useAuth()

    const findModel = chatModel.models.find((ct) => ct.model_name === model)

    if (user.email !== '' && findModel) {
        return `/dashboard/chat/${findModel.chatId}`
    } else {
        return `/dashboard/chat?model=${model}`
    }
}

export default handleLink
