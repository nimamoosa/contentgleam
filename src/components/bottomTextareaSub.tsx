import { useChat } from '@/contexts/chatProvider'
import { useController } from '@/contexts/controllerContext'
import { EnumModels } from '@/enum/Models'
import { Points } from '@/enum/Points'
import { AuthTypes } from '@/types/auth'
import { BotTypes } from '@/types/bot'
import { ChatTypes } from '@/types/chat'
import { inputModels } from '@/utils/inputModels'
import { Skeleton, Spinner, Textarea, Tooltip } from '@nextui-org/react'
import { BiSend } from 'react-icons/bi'
import { GrConfigure } from 'react-icons/gr'

interface props {
    isLoading: boolean
    user: AuthTypes
    templates: BotTypes[]
    userChat: ChatTypes | undefined | null
    handleSubmit: () => {}
}

export default function BottomTextareaSub({
    isLoading,
    user,
    templates,
    userChat,
    handleSubmit
}: props) {
    const { configSelect, setShowModel } = useController()
    const { textValue, setTextValue, isLoadingResponse } = useChat()

    const modelKey = Object.keys(EnumModels).find(
        (md) => EnumModels[md as keyof typeof EnumModels] === userChat?.model
    )

    const getModelPoint = Points[modelKey as keyof typeof Points]

    const areAllInputsFilled = (): boolean => {
        const requiredInputs = inputModels[userChat?.model || '']

        return (
            requiredInputs &&
            requiredInputs.every(
                (input) =>
                    configSelect[input.name] && configSelect[input.name] !== ''
            )
        )
    }

    return (
        <div className="fixed bottom-0 w-full right-0 h-[10vh] flex items-center justify-center z-10">
            <div className="w-[100%] h-[10vh] flex items-center justify-center bg-gray-700/90">
                {isLoading ? (
                    <>
                        <Skeleton className="w-[90%] h-[10vh] mb-5 bg-black/30 rounded-lg" />
                    </>
                ) : (
                    <Textarea
                        placeholder={
                            user.point.points < getModelPoint
                                ? `Your points are low to use this model! \nRequired points: ${getModelPoint}`
                                : templates.find(
                                      (md) => md.model == userChat?.model
                                  )?.input_label
                        }
                        isDisabled={
                            isLoadingResponse ||
                            user.point.points < getModelPoint
                        }
                        endContent={
                            <section className="flex flex-col items-center p-2">
                                {!inputModels[userChat?.model || ''] && (
                                    <div
                                        role="button"
                                        className={`px-1.5 py-1 rounded-lg transition-all duration-150 ${
                                            textValue !== '' &&
                                            !isLoadingResponse
                                                ? 'bg-gray-900 cursor-pointer ring-2 ring-transparent active:bg-gray-950 active:ring-blue-600'
                                                : 'cursor-not-allowed bg-gray-700 text-black/20'
                                        }`}
                                        onClick={() => {
                                            if (
                                                isLoadingResponse ||
                                                textValue == ''
                                            )
                                                return
                                            handleSubmit()
                                        }}>
                                        {isLoadingResponse ? (
                                            <Spinner></Spinner>
                                        ) : (
                                            <BiSend className="text-[25px]" />
                                        )}
                                    </div>
                                )}

                                {inputModels[userChat?.model || ''] ? (
                                    <>
                                        <Tooltip
                                            content={
                                                !areAllInputsFilled()
                                                    ? 'Please Set Config'
                                                    : 'Send'
                                            }>
                                            <div
                                                role="button"
                                                className={`px-1.5 py-1 rounded-lg transition-all duration-150 ${
                                                    areAllInputsFilled() &&
                                                    !isLoadingResponse &&
                                                    textValue !== ''
                                                        ? 'bg-gray-900 cursor-pointer ring-2 ring-transparent active:bg-gray-950 active:ring-blue-600'
                                                        : 'cursor-not-allowed bg-gray-700 text-black/20'
                                                }`}
                                                onClick={() => {
                                                    if (
                                                        !areAllInputsFilled() ||
                                                        isLoadingResponse ||
                                                        textValue == ''
                                                    )
                                                        return
                                                    handleSubmit()
                                                }}>
                                                {isLoadingResponse ? (
                                                    <Spinner></Spinner>
                                                ) : (
                                                    <BiSend className="text-[25px]" />
                                                )}
                                            </div>
                                        </Tooltip>
                                        <div
                                            className={`mt-2 px-1.5 py-1 rounded-lg ${
                                                isLoadingResponse &&
                                                'flex items-center justify-center'
                                            }`}>
                                            <div
                                                role="button"
                                                aria-label="config button"
                                                lang="en"
                                                className="px-3 py-2.5 rounded-lg bg-purple-700 cursor-pointer ring-2 ring-transparent active:bg-gray-950 active:ring-blue-600 transition-all duration-150"
                                                onClick={() =>
                                                    setShowModel(true)
                                                }>
                                                <GrConfigure />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </section>
                        }
                        classNames={{
                            input: 'text-[17px]',
                            inputWrapper:
                                'bg-black/80 group-data-[focus=true]:ring-2 group-data-[focus=true]:bg-black/90 absolute bottom-1 w-[90%] data-[hover=true]:bg-black/80',
                            base: 'flex items-center justify-center bg-transparent'
                        }}
                        value={textValue}
                        onChange={(e) => {
                            setTextValue(e.target.value as string)
                        }}></Textarea>
                )}
            </div>
        </div>
    )
}
