'use client'

import BotCards from '@/components/botCards'
import { Container, Display, Grid } from '@/components/display'
import LoadingBots from '@/components/loadingBots'
import TextComponent from '@/components/text'
import { useAuth } from '@/contexts/authProvider'
import { useChatModel } from '@/contexts/chat_model'
import { BotTypes } from '@/types/bot'
import TemplatesAI from '@/utils/AI/Templates'
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spinner,
    Switch,
    useDisclosure,
    User
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsStars } from 'react-icons/bs'
import { CgLogOut } from 'react-icons/cg'
import { IoSettings } from 'react-icons/io5'
import Swal from 'sweetalert2'

export default function Profile() {
    const { user, setUser, loading } = useAuth()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { chatModel } = useChatModel()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingBots, setIsLoadingBots] = useState<boolean>(true)
    const [bots, setBots] = useState<BotTypes[]>([])
    const [settingItems, setSettingItems] = useState([
        {
            name: 'answer AI Persian',
            is: false
        },
        {
            name: 'Hide Profile',
            is: false
        }
    ])
    const router = useRouter()

    useEffect(() => {
        if (loading) return
        if (!chatModel || !chatModel.models.length) {
            setIsLoadingBots(false)
            return
        }

        const userModels = chatModel.models.flatMap((ch) => ch.model_name)
        const filterBots = TemplatesAI().filter((tm) =>
            userModels.includes(tm.model)
        )

        setBots(filterBots)
        setIsLoadingBots(false)
    }, [chatModel, chatModel, loading])

    const handleLogout = async (): Promise<void> => {
        setIsLoading(true)

        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user.userId })
        })
        const json = await response.json()

        if (response.status !== 200) {
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
                title: json.message as string
            })
            setIsLoading(false)
        } else {
            setUser({ ...user, email: '' })

            Swal.fire({
                title: 'Success',
                html: 'You Logout From ContentGleam',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading(null)
                },
                willClose: () => {
                    router.push('/')
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    router.push('/')
                }
            })
        }
    }

    const handleSettingChange = (name: string) => {
        setSettingItems((prevItems) =>
            prevItems.map((item) =>
                item.name === name ? { ...item, is: !item.is } : item
            )
        )
    }

    return (
        <Display
            role="main"
            className="mt-16 flex items-center justify-center transition-all max-sm:mt-5">
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Setting
                            </ModalHeader>
                            <ModalBody>
                                <Grid grid_cols={2} className="w-full">
                                    {settingItems.map((item, index) => {
                                        return (
                                            <Switch
                                                isSelected={item.is}
                                                onValueChange={() =>
                                                    handleSettingChange(
                                                        item.name
                                                    )
                                                }
                                                key={index}
                                                defaultSelected
                                                color="secondary">
                                                {item.name}
                                            </Switch>
                                        )
                                    })}
                                </Grid>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Container className="w-[75%] h-[85vh] p-1 flex-col rounded-lg max-sm:h-[78vh] max-sm:w-[95%] bg-purple-800/40">
                <Container className="w-full flex-col h-[75vh] max-sm:h-[70vh] p-2">
                    <div className="border-b-2 pb-3 w-full h-fit flex justify-between items-center">
                        <User
                            name={user.email}
                            description="Member Of ContentGleam"
                            avatarProps={{
                                src: 'https://avatars.githubusercontent.com/u/30373425?v=4'
                            }}
                        />
                        <Container
                            justify="center"
                            alignItems="center"
                            className="bg-black/10 rounded-lg p-2">
                            <TextComponent
                                message={`<blue-200>${user.point.points}</blue-200>`}
                            />
                            <BsStars className="ml-2 max-sm:ml-1" />
                        </Container>
                    </div>

                    <Container flexDecoration="col">
                        <div className="grid grid-cols-2 gap-12 rounded-lg p-5 bg-black/10 justify-items-center mt-5 w-full overflow-auto hide_scrollbar max-h-[60vh] max-sm:max-h-[55vh] max-xl:grid-cols-1 max-xl:gap-10 max-xl:p-2">
                            {isLoadingBots ? (
                                <LoadingBots />
                            ) : (
                                bots.map((item, index) => {
                                    return (
                                        <BotCards
                                            chatModel={chatModel}
                                            item={item}
                                            index={index}
                                            key={index}
                                        />
                                    )
                                })
                            )}
                        </div>
                    </Container>
                </Container>

                <Container className="flex items-center justify-around w-full h-[10vh]">
                    <Button
                        className={`transition-all duration-400 flex items-center justify-center ${
                            isLoading ? 'bg-black' : 'bg-red-700'
                        }`}
                        isDisabled={isLoading}
                        onClick={handleLogout}>
                        {isLoading ? (
                            <Spinner></Spinner>
                        ) : (
                            <CgLogOut size={20} />
                        )}
                    </Button>
                    <Button className="bg-purple-900" isDisabled>
                        {<IoSettings size={20} className="text-white/80" />}
                    </Button>
                    {/* <Button
                        className={`transition-all duration-400 ${
                            isLoading ? 'bg-black' : 'bg-red-700'
                        }`}
                        isDisabled={isLoading}
                        onClick={handleLogout}>
                        {isLoading ? <Spinner></Spinner> : 'Delete Account'}
                    </Button> */}
                    {/* <Button>Logout</Button> */}
                </Container>
            </Container>
        </Display>
    )
}
