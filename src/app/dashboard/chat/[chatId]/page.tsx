'use client'

import { Container, Display } from '@/components/display'
import { useAuth } from '@/contexts/authProvider'
import { useChatModel } from '@/contexts/chat_model'
import { useChat } from '@/contexts/chatProvider'
import { ChatTypes } from '@/types/chat'
import React, { useEffect, useRef, useState } from 'react'
import { useController } from '@/contexts/controllerContext'
import handleErrorResponse from '@/functions/handleError'
import BottomTextareaSub from '@/components/bottomTextareaSub'
import InitLoadingChat from '@/components/initLoadingChat'
import useSecretKey from '@/hooks/useSecretKey'
import useChatInitialization from '@/hooks/useChatInitialization'
import useChatModelHook from '@/hooks/useChatModel'
import Config from '@/components/config'
import UserMessage from '@/components/userMessage_res'
import generateToken from '@/utils/token/token'
import Swal from 'sweetalert2'
import _1 from '@/functions/chat/sender/_1'
import f_1 from '@/functions/chat/effect/f_1'
import f_2 from '@/functions/chat/effect/f_2'
import ResponseModelHandler from '@/class/chatHandler'

export default function ChatIdPage({ params }: { params: { chatId: string } }) {
    // Extract values and functions from chat context
    const { textValue, setTextValue } = useChat()

    // Extract the current configuration from the controller context
    const { configSelect } = useController()

    // Extract chat-related state and functions from the chat context
    const {
        setChats,
        chats,
        setIsLoadingResponse,
        isLoadingChat,
        isLoadingResponse,
        prompt,
        setPrompt
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
    const { chatTitle, error } = useChatModelHook(chatModel, params)

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
            prompt !== '' &&
            chats.some((c) => c.chatId !== params.chatId) &&
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
                prompt,
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

                    setPrompt('')

                    f_2(
                        configSelect,
                        prompt,
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
    }, [params.chatId, prompt, userChat, chats, sec, chatModel])

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
     * Handles the form submission by triggering the AI model response.
     */
    const handleSubmit = async () => {
        const res = new ResponseModelHandler(
            params,
            userChat,
            textValue,
            user,
            sec
        )

        await res.responseAImodel(
            setIsLoadingResponse,
            setTextValue,
            setChats,
            configSelect,
            templates,
            setUser
        )
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
                    <div>Error</div>
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
