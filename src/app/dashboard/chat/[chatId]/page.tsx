'use client' // This tells Next.js that this is a Client Component

/**
 * Main component for the chat page.
 * Initializes and manages chat state, handles responses, and renders the chat interface.
 *
 * @param {Object} params - Parameters passed to the component.
 * @param {string} params.chatId - The ID of the current chat.
 * @returns {JSX.Element} The rendered chat page.
 */

import { Container, Display } from '@/components/display'
import { useAuth } from '@/contexts/authProvider'
import { useChatModel } from '@/contexts/chat_model'
import { useChat } from '@/contexts/chatProvider'
import { ChatTypes } from '@/types/chat'
import React, { useEffect, useRef } from 'react'
import { useController } from '@/contexts/controllerContext'
import handleErrorResponse from '@/functions/handleError'
import BottomTextareaSub from '@/components/bottomTextareaSub'
import InitLoadingChat from '@/components/initLoadingChat'
import useSecretKey from '@/hooks/useSecretKey'
import useChatInitialization from '@/hooks/useChatInitialization'
import useChatModelHook from '@/hooks/useChatModel'
import Config from '@/components/config'
import UserMessage from '@/components/userMessage_res'
import replace from '@/constant/replacements'
import generateToken from '@/utils/token/token'
import Swal from 'sweetalert2'
import _1 from '@/functions/chat/sender/_1'
import _2 from '@/functions/chat/sender/_2'
import _3 from '@/functions/chat/sender/_3'
import f_1 from '@/functions/chat/effect/f_1'
import f_2 from '@/functions/chat/effect/f_2'

export default function ChatIdPage({ params }: { params: { chatId: string } }) {
    // Extract values and functions from chat context
    const { textValue, setTextValue } = useChat()

    // Extract the current configuration from the controller context
    const { configSelect } = useController()

    // Extract chat-related state and functions from the chat context
    const {
        promote,
        setChats,
        chats,
        setIsLoadingResponse,
        isLoadingChat,
        isLoadingResponse
    } = useChat()

    // Extract chat model context
    const { chatModel } = useChatModel()

    // Extract user authentication information
    const { user, setUser } = useAuth()

    // Reference for scrolling to the bottom of the chat container
    const mainContainerRef = useRef<HTMLDivElement>(null)

    // Retrieve the secret key using a custom hook
    const sec = useSecretKey()

    // Initialize chat data, user chat, templates, and loading/error state
    const { setUserChat, userChat, templates, isLoading } =
        useChatInitialization(chats, params, user)

    // Initialize chat model data
    const { chatTitle, error: chatModelError } = useChatModelHook(
        chatModel,
        params
    )

    /**
     * A map of replacements to be made in the prompt text
     * based on the selected model type. This is used to customize
     * the AI prompt for different use cases.
     */
    const replacementsMap = replace(configSelect, textValue)

    /**
     * Generates the prompt text based on the selected AI model and user input.
     *
     * @param {BotTypes | undefined} finalPromote - The selected AI model.
     * @param {string} prompt_ai - The user's input prompt.
     * @returns {string} The formatted prompt text.
     */

    /**
     * Effect hook to handle the chat model request and response processing.
     * This is triggered when chatId, promote, userChat, or sec changes.
     */
    useEffect(() => {
        if (!chatModel) {
            return
        }

        const findChat = chatModel.models.find(
            (md) => md.chatId == params.chatId
        )

        if (
            params.chatId !== '' &&
            textValue !== '' &&
            !chats.some((c) => c.chatId == params.chatId) &&
            findChat &&
            sec != ''
        ) {
            const token = generateToken(sec)

            /**
             * Sends chat data to the server, processes the response, and updates the chat state.
             */

            f_1(
                params,
                findChat,
                textValue,
                user,
                sec,
                (json) => {
                    const dataGiver = json.data.find(
                        (i: ChatTypes) => i.chatId === params.chatId
                    ) as ChatTypes
                    setUserChat(dataGiver)

                    const lastIndex = dataGiver.messages.length - 1
                    const lastMessage = dataGiver.messages[lastIndex]
                    const finalPromote = templates.find(
                        (tmp) => tmp.model == findChat.model_name
                    )

                    setTextValue('')

                    f_2(
                        configSelect,
                        textValue,
                        dataGiver,
                        lastMessage,
                        params,
                        userChat,
                        user,
                        setChats,
                        finalPromote,
                        sec,
                        setIsLoadingResponse,
                        setUser,
                        (e) => {
                            handleErrorResponse(
                                undefined,
                                setIsLoadingResponse,
                                userChat,
                                setChats,
                                user,
                                params,
                                token,
                                sec,
                                e.message
                            )
                            setIsLoadingResponse(false)
                        }
                    )
                },
                (e_j) => {
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
                        title: e_j.error
                    })

                    setIsLoadingResponse(false)
                },
                (err) => {
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
                        title: err.message
                    })
                }
            )
        }
    }, [params.chatId, textValue, userChat, chats, sec, chatModel])

    /**
     * Effect hook to scroll to the bottom of the chat container after rendering new messages.
     */
    useEffect(() => {
        const scrollToBottom = () => {
            mainContainerRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        }

        setTimeout(scrollToBottom, 100) // Adjust timeout as needed
    }, [chats])

    /**
     * Handles the AI model response by sending the user's input to the server.
     *
     * @param {string} promote_ai - The user's input or selected configuration.
     */
    const responseAImodel = async (promote_ai: string): Promise<void> => {
        setIsLoadingResponse(true)
        _1(
            params,
            userChat,
            promote_ai,
            user,
            sec,
            (j) => {
                const h_J = j.data as ChatTypes[]
                const dataGiver = h_J.find(
                    (i: ChatTypes) => i.chatId === params.chatId
                )

                setTextValue('')

                if (dataGiver) {
                    const lastMessage =
                        dataGiver.messages[dataGiver.messages.length - 1]
                    const finalPromote = templates.find(
                        (tmp) => tmp.model === userChat?.model
                    )

                    _2(
                        dataGiver,
                        lastMessage,
                        params,
                        userChat,
                        user,
                        setChats,
                        configSelect,
                        textValue,
                        finalPromote,
                        promote_ai,
                        sec,
                        setIsLoadingResponse,
                        setUser,
                        (e) => {
                            _3(
                                setIsLoadingResponse,
                                userChat,
                                setChats,
                                user,
                                params,
                                sec,
                                e.message,
                                (ee) => {
                                    const Toast = Swal.mixin({
                                        toast: true,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                        didOpen: (toast) => {
                                            toast.onmouseenter = Swal.stopTimer
                                            toast.onmouseleave =
                                                Swal.resumeTimer
                                        }
                                    })
                                    Toast.fire({
                                        icon: 'error',
                                        title: ee.message
                                    })
                                }
                            )
                        }
                    )
                }
            },
            (e_json) => {
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
                    title: e_json.message
                })

                setIsLoadingResponse(false)
            },
            (e) => {
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
                    title: e.message
                })

                setIsLoadingResponse(false)
            }
        )
    }

    /**
     * Handles the form submission by triggering the AI model response.
     */
    const handleSubmit = async () => {
        responseAImodel(textValue || configSelect.video_topic)
    }

    return (
        <Display>
            <Container className="w-[97%] ml-auto mr-auto mt-20 overflow-y-auto flex flex-col">
                {' '}
                {/* Ensure max height and scroll */}
                {isLoading || isLoadingChat ? (
                    <InitLoadingChat />
                ) : !isLoading &&
                  !isLoadingChat &&
                  userChat === null &&
                  !isLoadingResponse ? (
                    <>error</>
                ) : (
                    <UserMessage userChat={userChat} chatTitle={chatTitle} />
                )}
                <div ref={mainContainerRef} />
            </Container>

            <Config userChat={userChat} key={'model'} />

            {!isLoadingChat && !isLoading && userChat == null ? (
                <></>
            ) : (
                <BottomTextareaSub
                    isLoading={isLoading || isLoadingChat}
                    templates={templates}
                    user={user}
                    userChat={userChat}
                    handleSubmit={handleSubmit}
                />
            )}
        </Display>
    )
}
