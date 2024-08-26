import { NextRequest, NextResponse } from 'next/server'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import { ApiUrl } from '../utils/apiUrl'
import getClientInfo from '../utils/clientInfo'
import { chatSession } from '../../../utils/AI/aiModel'
import { DecJET } from '@/functions/token'

// Use environment variable for secret key
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || ''

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || ''
// Define allowed origin
const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || ''

interface Props {
    enc: string
}

export const POST = async (request: NextRequest) => {
    try {
        const origin = request.headers.get('origin')
        const referer = request.headers.get('referer')

        // Check if request is from an allowed origin
        // if (
        //     origin !== ALLOWED_ORIGIN &&
        //     referer &&
        //     !referer.startsWith(ALLOWED_ORIGIN)
        // ) {
        //     return NextResponse.json(
        //         { message: 'Forbidden Request' },
        //         { status: 403 }
        //     )
        // }

        // Verify authorization header
        const authHeader = request.headers.get('authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const clientInfo = await getClientInfo(request)
            const newToken = jwt.sign(clientInfo, JWT_SECRET, {
                expiresIn: '1d'
            })

            await fetch(ApiUrl('sec', 'new_'), {
                method: 'POST',
                body: JSON.stringify({ token: newToken })
            })

            return NextResponse.json(
                { message: 'Unknown Error' },
                { status: 403 }
            )
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

            const jsonT = await responseToken.json()

            return NextResponse.json(
                { message: jsonT.message || 'Lucky!' },
                { status: 403 }
            )
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

        const { enc }: Props = await request.json()

        const decoded = DecJET(enc, SECRET_KEY)

        if (decoded.status === 'error') {
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

        const toJson = JSON.parse(decoded.message) as {
            prompt: string
        }

        const { prompt } = toJson

        const result = await chatSession.sendMessage(prompt)
        const response = result.response
        const text = response.text()

        return NextResponse.json(
            { message: 'AI generated successfully', data: text },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : 'Error generating content'
            },
            { status: 500 }
        )
    }
}
