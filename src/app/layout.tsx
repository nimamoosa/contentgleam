import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
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
    keywords:
        'AI content generation, AI writing tools, automated content creation, AI content creator, content marketing, SEO content, blog writing AI, social media content, content automation, AI-driven content, machine learning content creation, GPT-4 content, AI image generation, creative AI, content optimization, digital marketing, AI content platform, online content tools, smart content creation, AI-powered content, content generation software',
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
    maximumScale: 5, // Allowing zoom up to 500%
    userScalable: false, // Allowing users to zoom
    themeColor: '#180828'
}

const inter = Inter({ subsets: ['latin'], weight: '300' })

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
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
