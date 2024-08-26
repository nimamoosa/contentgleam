import type { Metadata, Viewport } from 'next'
import { NextUIProvider } from '@nextui-org/react'
import AuthProvider from '@/contexts/authProvider'
import { Analytics } from '@vercel/analytics/react'
import ChatModelProvider from '@/contexts/chat_model'
import ChatProvider from '@/contexts/chatProvider'
import ControllerProvider from '@/contexts/controllerContext'
import ShopProvider from '@/contexts/shopContext'
import './globals.css'

export const metadata: Metadata = {
    title: 'Content Gleam',
    description: 'Generated AI Content',
    manifest: 'https://contentgleam.vercel.app/manifest.json',
    openGraph: {
        title: 'Content Gleam',
        description: 'Generated AI Content',
        url: 'https://contentgleam.vercel.app/ai_image.png',
        siteName: 'Content Gleam',
        type: 'website',
        images: [
            {
                url: 'https://contentgleam.vercel.app/ai_image.png',
                width: 1024,
                height: 1024,
                type: 'image/png',
                alt: 'Content Gleam Image'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Content Gleam',
        description: 'Create AI Content',
        images: ['https://contentgleam.vercel.app/ai_image.png']
    }
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#180828'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <NextUIProvider>
                        <ControllerProvider>
                            <ChatModelProvider>
                                <ChatProvider>
                                    <ShopProvider>
                                        {children}
                                        <Analytics />
                                    </ShopProvider>
                                </ChatProvider>
                            </ChatModelProvider>
                        </ControllerProvider>
                    </NextUIProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
