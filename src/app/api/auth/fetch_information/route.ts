import { NextRequest, NextResponse } from 'next/server'
import { ApiUrl } from '../../utils/apiUrl'

export const POST = async (request: NextRequest) => {
    try {
        const cookie = request.cookies.get('session')

        if (!cookie?.value)
            return NextResponse.json(
                { message: 'No Session Found' },
                { status: 400 }
            )

        const response = await fetch(ApiUrl('auth', 'fetch_user'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: cookie.value })
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
    } catch (error) {
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : error
            },
            { status: 500 }
        )
    }
}
