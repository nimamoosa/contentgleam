import { Models } from '@/types/chat_model'
import { NextRequest, NextResponse } from 'next/server'
import { ApiUrl } from '../../utils/apiUrl'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import { Dec } from '@/functions/token'
import getClientInfo from '../../utils/clientInfo'

interface props {
    enc: string
}

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || ''

export const POST = async (request: NextRequest) => {
    const { enc }: props = await request.json()
    const cookies = request.cookies.get('session')

    if (!cookies?.value) return NextResponse.json({ message: 'No User Found' })

    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
            { message: 'Unauthorized Request' },
            { status: 401 }
        )
    }

    const token = authHeader.replace('Bearer ', '')
    const decoded = Dec(enc, SECRET_KEY)

    if (decoded.status == 'error') {
        const clientInfo = await getClientInfo(request)
        const newToken = jwt.sign(
            clientInfo,
            process.env.NEXT_PUBLIC_JWT_SECRET || '',
            {
                expiresIn: '1min'
            }
        )

        await fetch(ApiUrl('sec', 'new_'), {
            method: 'POST',
            body: JSON.stringify({ token: newToken })
        })

        return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const toJson = JSON.parse(decoded.message) as {
        userId: string
        model: string
        title: string
    }

    // Verify token with JWT
    const encodedToken = jwt.sign(
        { t: token },
        process.env.NEXT_PUBLIC_JWT_SECRET || '',
        {
            expiresIn: '1min'
        }
    )

    const responseToken = await fetch(ApiUrl('token', 't'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: encodedToken })
    })

    if (responseToken.status !== 200) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const response = await fetch(ApiUrl('ai_chat_model', 'ai_chat'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: toJson.userId,
            model: toJson.model,
            title: toJson.title
        })
    })

    const json = await response.json()

    if (response.status == 200) {
        return NextResponse.json(
            { message: json.message, data: json.data, chatId: json.chatId },
            { status: 200 }
        )
    }

    // console.log(first)

    return NextResponse.json(json, { status: response.status })
}
