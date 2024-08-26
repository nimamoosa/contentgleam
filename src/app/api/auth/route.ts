import { NextRequest, NextResponse } from 'next/server'
import { AuthUser } from '@/types/auth'
import { ApiUrl } from '../utils/apiUrl'

export async function POST(request: NextRequest) {
    try {
        const { email, password }: AuthUser = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Validation Error' },
                { status: 400 }
            )
        }

        const responseAuth = await fetch(ApiUrl('auth', 'authentication'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                remember: true
            })
        })

        const json = await responseAuth.json()

        if (responseAuth.status === 201) {
            const response = NextResponse.json(
                { data: json.data },
                { status: 201 }
            )

            response.cookies.set('session', json.data.token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60
            })

            return response
        }

        if (responseAuth.status === 200) {
            const response = NextResponse.json(
                { data: json.data },
                { status: 200 }
            )

            response.cookies.set('session', json.data.token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60
            })

            return response
        }

        return NextResponse.json(
            { message: json.message },
            { status: responseAuth.status }
        )
    } catch (error) {
        return NextResponse.json(
            {
                message:
                    error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
