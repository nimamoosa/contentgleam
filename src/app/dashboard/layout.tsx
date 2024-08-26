'use client'

import { Container, Display, Fixed } from '@/components/display'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/authProvider'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
    Link as NextUILink,
    Spinner,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { BsInstagram, BsTelegram } from 'react-icons/bs'
import StarsBackground from '@/components/dots'
import BackgroundSwitcher from '@/components/backgroundSwitcher'
import { BiBell } from 'react-icons/bi'
import TextComponent from '@/components/text'

export default function DashboardLayout({
    children
}: Readonly<{ children: ReactNode }>) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    const { loading, user } = useAuth()
    const containerRef = useRef<HTMLDivElement | null>(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const pathname = usePathname()

    const menuItems = ['Profile']

    const supportItems = [
        {
            name: 'Telegram',
            href: 'https://t.me/contentgleam',
            icon: <BsTelegram />
        }
        // {
        //   name: "Instagram",
        //   href: "#",
        //   icon: <BsInstagram />,
        // },
    ]

    useEffect(() => {
        if (!containerRef.current) return
        if (pathname !== '/dashboard') return

        // Define the scroll event handler
        const handleScroll = () => {
            if (containerRef.current) {
                const scrollTop = containerRef.current.scrollTop

                sessionStorage.setItem('scroll_', scrollTop.toString())
            }
        }

        // Add scroll event listener
        containerRef.current.addEventListener('scroll', handleScroll)

        // Clean up the event listener on component unmount
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll)
            }
        }
    }, [containerRef.current, pathname])

    useEffect(() => {
        if (pathname === '/dashboard') {
            const scroll_ = sessionStorage.getItem('scroll_')

            if (!scroll_) return

            containerRef.current?.scrollTo({ top: parseInt(scroll_) })
        }
    }, [pathname, containerRef.current])

    // useEffect(() => {
    //   window.addEventListener("beforeunload", (e) => {
    //     e.preventDefault();
    //     sessionStorage.setItem("scroll_", "0");
    //   });
    // }, []);

    return (
        <Display className="w-full flex h-[100vh]" role="main">
            <div
                aria-hidden="true"
                className="fixed dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] z-0">
                <img
                    src="/docs-left.png"
                    className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                    alt="docs left background"
                    data-loaded="true"
                />
            </div>

            <div
                aria-hidden="true"
                className="fixed dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-180">
                <img
                    src="/docs-right.png"
                    className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                    alt="docs right background"
                    data-loaded="true"
                />
            </div>

            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                        className="fixed w-full h-full z-50">
                        <Container className="bg-black/90 fixed w-full h-full right-0 flex items-center justify-center z-50">
                            <Container justify="center" alignItems="center">
                                <Spinner size="lg">
                                    <div className="mt-2 text-tiny">
                                        <p>loading data</p>
                                    </div>
                                </Spinner>
                            </Container>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                aria-live="polite">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <TextComponent
                                    message={`<blue-200>${user.email}</blue-200> Notif`}
                                />
                            </ModalHeader>
                            <ModalBody>
                                <p>ContentGleam Notification Coming Soon...</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}>
                                    Close
                                </Button>
                                {/* <Button color="primary" onPress={onClose}>
                                    Action
                                </Button> */}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Container flexDecoration="col" className="w-full h-full">
                {pathname.startsWith('/dashboard/doc') ? (
                    <></>
                ) : (
                    <Container className="w-[100%] h-[10vh] fixed right-0 z-50">
                        <Navbar
                            onMenuOpenChange={setIsMenuOpen}
                            classNames={{
                                base: 'bg-black/30 w-full backdrop-filter backdrop-blur-sm'
                            }}>
                            <NavbarContent>
                                <NavbarMenuToggle
                                    aria-label={
                                        isMenuOpen ? 'Close menu' : 'Open menu'
                                    }
                                    className="sm:hidden"
                                />
                                <NavbarBrand>
                                    {/* <AcmeLogo /> */}
                                    <p className="font-bold text-inherit">
                                        ContentGleam AI
                                    </p>
                                </NavbarBrand>
                            </NavbarContent>

                            <NavbarContent
                                className="hidden sm:flex gap-4"
                                justify="center">
                                <NavbarItem>
                                    <NextUILink
                                        href="/dashboard/profile"
                                        aria-current="page">
                                        Profile
                                    </NextUILink>
                                </NavbarItem>
                            </NavbarContent>
                            <NavbarContent justify="end">
                                {supportItems.map((item, index) => {
                                    return (
                                        <NavbarItem key={index}>
                                            <NextUILink
                                                target="_blank"
                                                href={item.href}
                                                className="flex items-center justify-center px-2 py-1 rounded-lg text-black bg-purple-100">
                                                <span>{item.name}</span>
                                                <span className="ml-1">
                                                    {item.icon}
                                                </span>
                                            </NextUILink>
                                            {/* <Button
                      className="flex items-center justify-center bg-green-600 text-black/90"
                      as={Link}
                      href={item.href}
                      endContent={item.icon}
                    >
                      {""}
                    </Button> */}
                                        </NavbarItem>
                                    )
                                })}

                                <NavbarItem>
                                    <div
                                        className="bg-default-200 rounded-lg text-[20px] p-2 transition-all hover:scale-[1.1]"
                                        role="button"
                                        aria-labelledby="button_"
                                        onClick={onOpen}>
                                        <BiBell />
                                    </div>
                                </NavbarItem>
                            </NavbarContent>
                            <NavbarMenu>
                                {menuItems.map((item, index) => (
                                    <NavbarMenuItem
                                        className="mt-10"
                                        key={`${item}-${index}`}>
                                        <Link
                                            color={
                                                index === 2
                                                    ? 'primary'
                                                    : index ===
                                                      menuItems.length - 1
                                                    ? 'danger'
                                                    : 'foreground'
                                            }
                                            className="w-full"
                                            href="/dashboard/profile">
                                            {item}
                                        </Link>
                                    </NavbarMenuItem>
                                ))}
                            </NavbarMenu>
                        </Navbar>
                    </Container>
                )}

                <Container
                    className="relative z-10 w-full min-h-[100vh] bg-fixed bg-blend-multiply bg-stripe-gradient-2 from-blue-900 via-violet-950/40 to-purple-600/40"
                    ref={containerRef}>
                    {children}
                    {/* <BackgroundSwitcher /> */}
                </Container>
            </Container>
        </Display>
    )
}
