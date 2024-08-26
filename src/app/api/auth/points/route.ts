import { NextRequest, NextResponse } from 'next/server'
import getClientInfo from '../../utils/clientInfo'
import jwt from 'jsonwebtoken'
import { ApiUrl } from '../../utils/apiUrl'
import { Models } from '@/types/chat_model'
import CryptoJS from 'crypto-js'

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || ''

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || ''
// Define allowed origin
const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || ''

export const POST = async (request: NextRequest) => {
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    const authHeader = request.headers.get('authorization')
    const cookies = request.cookies.get('session')

    // Check if request is from an allowed origin
    // if (
    //     origin !== ALLOWED_ORIGIN &&
    //     referer &&
    //     !referer.startsWith(ALLOWED_ORIGIN)
    // ) {
    //     console.log(origin, referer.startsWith(ALLOWED_ORIGIN))
    //     return NextResponse.json(
    //         { message: 'Forbidden Request' },
    //         { status: 403 }
    //     )
    // }

    // Verify authorization header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const clientInfo = await getClientInfo(request)
        const newToken = jwt.sign(clientInfo, JWT_SECRET, {
            expiresIn: '1d'
        })

        await fetch(ApiUrl('sec', 'new_'), {
            method: 'POST',
            body: JSON.stringify({ token: newToken })
        })

        return NextResponse.json({ message: 'Unknown Error' }, { status: 403 })
    }

    if (cookies?.value === '') {
        return NextResponse.json({ message: 'No User Found' }, { status: 400 })
    }

    const token = authHeader.replace('Bearer ', '')
    const bytes = CryptoJS.AES.decrypt(token, SECRET_KEY)
    const timestamp = bytes.toString(CryptoJS.enc.Utf8)

    const genToken = jwt.sign({ t: token.toString() }, JWT_SECRET, {
        expiresIn: '1d'
    })

    const responseToken = await fetch(ApiUrl('token', 't'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: genToken })
    })

    if (!responseToken.ok) {
        const clientInfo = await getClientInfo(request)
        const newToken = jwt.sign(clientInfo, JWT_SECRET, {
            expiresIn: '1d'
        })

        await fetch(ApiUrl('sec', 'new_'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: newToken })
        })
        return NextResponse.json({ message: 'Lucky!' }, { status: 403 })
    }

    if (!timestamp) {
        const clientInfo = await getClientInfo(request)
        const newToken = jwt.sign(clientInfo, JWT_SECRET, {
            expiresIn: '1d'
        })

        await fetch(ApiUrl('sec', 'new_'), {
            method: 'POST',
            body: JSON.stringify({ token: newToken })
        })
        return NextResponse.json(
            { message: 'Forbidden Request' },
            { status: 403 }
        )
    }

    console.log('val', cookies?.value)

    const { e }: { e: Models } = await request.json()

    if (e) {
        const genToken = jwt.sign({ model: e }, JWT_SECRET, { expiresIn: '1d' })

        const responsePoint = await fetch(ApiUrl('auth', 'points'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: cookies?.value,
                t: genToken
            })
        })

        const json = await responsePoint.json()

        if (responsePoint.ok) {
            return NextResponse.json(
                { message: json.message, data: json.data },
                { status: 200 }
            )
        }

        return NextResponse.json(
            { message: json.message },
            { status: responsePoint.status }
        )
    }
}
