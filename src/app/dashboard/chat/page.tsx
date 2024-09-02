'use client'

import { Suspense } from 'react'
import { Container, Display } from '@/components/display'
import TextComponent from '@/components/text'
import { useAuth } from '@/contexts/authProvider'
import { useChatModel } from '@/contexts/chat_model'
import { useChat } from '@/contexts/chatProvider'
import { BotTypes } from '@/types/bot'
import { ChatModelTypes, Models } from '@/types/chat_model'
import TemplatesAI from '@/utils/AI/Templates'
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Spinner,
    Textarea,
    Tooltip
} from '@nextui-org/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { GrConfigure } from 'react-icons/gr'
import { useController } from '@/contexts/controllerContext'
import { EnumModels } from '@/enum/Models'
import { Points } from '@/enum/Points'
import { inputModels } from '@/utils/inputModels'
import Swal from 'sweetalert2'
import { Enc } from '@/functions/token'

const SearchBars = () => {
    const [findBot, setFindBot] = useState<BotTypes | undefined>()
    const [error, setError] = useState<{ message: string; isError: boolean }>({
        message: '',
        isError: false
    })
    const { setChatModel, chatModel } = useChatModel()
    const { showModel, setShowModel, configSelect, setConfigSelect } =
        useController()
    const {
        textValue,
        setTextValue,
        setPrompt,
        isLoadingResponse,
        setIsLoadingResponse
    } = useChat()
    const { user } = useAuth()
    const searchParams = useSearchParams()
    const router = useRouter()

    const generateToken = () => {
        const timestamp = new Date().toISOString()
        const token = Enc(timestamp, process.env.NEXT_PUBLIC_SECRET_KEY || '')
        return token
    }

    const model = searchParams.get('model') as Models

    useEffect(() => {
        const foundBot = TemplatesAI().find((bot) => bot.model === model)

        if (!foundBot) {
            setError({ message: 'Bot Not Found', isError: true })
            return
        }

        if (user.email === '') return

        setFindBot(foundBot)
    }, [model, user])

    useEffect(() => {
        if (
            chatModel &&
            chatModel.models.find((md) => md.model_name === model) &&
            !isLoadingResponse
        ) {
            router.push('/dashboard')
        }
    }, [chatModel, model, router, isLoadingResponse])

    const handleCreateChat = async () => {
        setIsLoadingResponse(true)
        const response = await fetch('/api/models/create_model', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${generateToken()}`
            },
            body: JSON.stringify({
                enc: Enc(
                    JSON.stringify({
                        model,
                        title: findBot?.name,
                        userId: user.userId
                    }),
                    process.env.NEXT_PUBLIC_SECRET_KEY || ''
                )
            })
        })
        const json = await response.json()

        if (response.ok) {
            const data = json.data as ChatModelTypes

            setChatModel((prev) =>
                prev
                    ? {
                          ...prev,
                          models: [...(prev.models || []), ...data.models]
                      }
                    : data
            )
            router.push(`/dashboard/chat/${json.chatId}`)
            setPrompt(textValue)
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer
                    toast.onmouseleave = Swal.resumeTimer
                }
            })
            Toast.fire({
                icon: 'error',
                title: json.message + '\nplease try again'
            })
            setIsLoadingResponse(false)
        }
    }

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
        names: string = '',
        option?: string[]
    ) => {
        const { name, value } = e.target

        setConfigSelect((prev) => ({
            ...prev,
            [name || names]: option
                ? `${option[Number(value)]},${value || '0'}`
                : value
        }))
    }

    const getSelectOptions = (options: string[] | undefined) => {
        return options || []
    }

    const modelKey = Object.keys(EnumModels).find(
        (md) => EnumModels[md as keyof typeof EnumModels] === model
    )

    const getModelPoint = Points[modelKey as keyof typeof Points]

    const areAllInputsFilled = (): boolean => {
        const requiredInputs = inputModels[model || '']

        return (
            requiredInputs &&
            requiredInputs.every(
                (input) =>
                    configSelect[input.name] && configSelect[input.name] !== ''
            )
        )
    }

    const inputs = inputModels[model || ''] || []

    const renderModelBody = () => {
        return inputs.map((it, idx) => {
            if (it.type === 'input') {
                return (
                    <Input
                        key={it.name + idx} // Ensure unique key for each input
                        placeholder={it.placeholder}
                        value={
                            configSelect[
                                it.name as keyof typeof configSelect
                            ] || ''
                        }
                        name={it.name}
                        onChange={handleChange}
                    />
                )
            }

            if (it.type === 'select') {
                const options = getSelectOptions(it.options)

                return (
                    <Select
                        key={idx}
                        label={it.placeholder}
                        selectedKeys={
                            configSelect[
                                it.name as keyof typeof configSelect
                            ] &&
                            configSelect[
                                it.name as keyof typeof configSelect
                            ].split(',')[1]
                        }
                        onChange={(e) => handleChange(e, it.name, options)}
                        className="max-w-xs">
                        {options.map((option, optionIndex) => (
                            <SelectItem key={optionIndex}>{option}</SelectItem>
                        ))}
                    </Select>
                )
            }

            return null
        })
    }

    return (
        <div className="w-full">
            {error.isError ? (
                <Display className="mt-24">
                    <Container className="w-full flex items-center justify-center">
                        <div>
                            <h4 className="text-2xl">{error.message}</h4>
                        </div>
                    </Container>
                </Display>
            ) : (
                <Display className="w-full">
                    <Container
                        justify="start"
                        alignItems="center"
                        flexDecoration="col"
                        className="w-full h-full mt-24 overflow-auto">
                        <Container
                            justify="center"
                            alignItems="center"
                            className="text-3xl uppercase border-b-2 border-white/60 w-full max-sm:p-2 max-sm:w-[95%] max-sm:text-center">
                            <TextComponent
                                message={`<blue-400>${findBot?.name}</blue-400> <orange-100>Bot</orange-100>`}
                                className="mb-4"
                            />
                        </Container>

                        <Container
                            justify="center"
                            alignItems="center"
                            className="mt-5 w-full p-2 whitespace-break-spaces text-center">
                            <TextComponent message={`${findBot?.desc}`} />
                        </Container>
                    </Container>

                    <Modal isOpen={showModel} onOpenChange={setShowModel}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">
                                        Config
                                    </ModalHeader>
                                    <ModalBody>{renderModelBody()}</ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="danger"
                                            variant="light"
                                            onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button
                                            color="primary"
                                            onPress={onClose}>
                                            Action
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    <div className="fixed bottom-0 w-full right-0 h-[10vh] flex items-center justify-center">
                        <div className="w-[100%] h-[10vh] flex items-center justify-center bg-black/90">
                            <Textarea
                                placeholder={
                                    user.point.points < getModelPoint
                                        ? `Your points are low to use this model! \nRequired points: ${getModelPoint}`
                                        : findBot?.input_label
                                }
                                isDisabled={
                                    isLoadingResponse ||
                                    user.point.points < getModelPoint
                                }
                                endContent={
                                    <section className="flex flex-col h-full items-center justify-center ml-3">
                                        {!inputModels[model] && (
                                            <div
                                                role="button"
                                                className={`px-1.5 py-1 rounded-lg transition-all duration-150 ${
                                                    textValue !== ''
                                                        ? 'bg-gray-900 cursor-pointer ring-2 ring-transparent active:bg-gray-950 active:ring-blue-600'
                                                        : 'cursor-not-allowed bg-gray-700 text-black/20'
                                                }`}
                                                onClick={() => {
                                                    if (isLoadingResponse)
                                                        return

                                                    if (textValue !== '') {
                                                        handleCreateChat()
                                                    }
                                                }}>
                                                {isLoadingResponse ? (
                                                    <Spinner />
                                                ) : (
                                                    <BiSend className="text-[25px]" />
                                                )}
                                            </div>
                                        )}

                                        {inputModels[model] && (
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
                                                            textValue !== ''
                                                                ? 'bg-gray-900 cursor-pointer ring-2 ring-transparent active:bg-gray-950 active:ring-blue-600'
                                                                : 'cursor-not-allowed bg-gray-700 text-black/20'
                                                        }`}
                                                        onClick={() => {
                                                            if (
                                                                isLoadingResponse
                                                            )
                                                                return

                                                            if (
                                                                areAllInputsFilled()
                                                            ) {
                                                                handleCreateChat()
                                                            }
                                                        }}>
                                                        {isLoadingResponse ? (
                                                            <Spinner />
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
                                        )}
                                    </section>
                                }
                                classNames={{
                                    input: 'text-[17px]',
                                    inputWrapper:
                                        'bg-black/90 data-[focus=true]:bg-black absolute bottom-1 w-[90%]',
                                    base: 'flex items-center justify-center bg-transparent'
                                }}
                                value={textValue}
                                onChange={(e) =>
                                    setTextValue(e.target.value as string)
                                }
                            />
                        </div>
                    </div>
                </Display>
            )}
        </div>
    )
}

const Chat = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <SearchBars />
    </Suspense>
)

export default Chat
