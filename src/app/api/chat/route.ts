import { NextRequest, NextResponse } from 'next/server'
import { Modes } from '@/types/chat'
import { Models } from '@/types/chat_model'
import { ApiUrl } from '../utils/apiUrl'
import { Dec } from '@/functions/token'
interface props {
    enc: string
}

const SecretKey = process.env.NEXT_PUBLIC_SECRET_KEY || ''

export const POST = async (request: NextRequest) => {
    const { enc }: props = await request.json()

    const des = Dec(enc, SecretKey)

    if (des.status == 'error') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const toJson = JSON.parse(des.message) as {
        chatId: string
        model: Models
        content: string
        role: 'bot' | 'user'
        mode: Modes
        userId: string
    }

    if (toJson.chatId == '') {
        return NextResponse.json(
            { message: 'Validation Error' },
            { status: 401 }
        )
    }

    if (toJson.content == '') {
        return NextResponse.json(
            { message: 'Validation Error' },
            { status: 401 }
        )
    }

    const cookie = request.cookies.get('session')

    if (cookie?.value === '')
        return NextResponse.json({ message: 'No User Found' }, { status: 400 })

    const response = await fetch(ApiUrl('chat', 'chat_response'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chatId: toJson.chatId,
            model: toJson.model,
            content: toJson.content,
            role: toJson.role,
            mode: toJson.mode,
            userId: toJson.userId
        })
    })

    const json = await response.json()

    if (response.status === 200) {
        return NextResponse.json(
            { message: json.message, data: json.data },
            { status: 200 }
        )
    }

    return NextResponse.json(
        { message: json.message },
        { status: response.status }
    )
}
