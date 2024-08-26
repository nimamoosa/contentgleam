import { NextRequest, NextResponse } from 'next/server'
import { ApiUrl } from '../../utils/apiUrl'

export const POST = async (request: NextRequest) => {
    const { userId } = await request.json()
    const cookie = request.cookies.get('session')

    if (!cookie?.value)
        return NextResponse.json(
            { message: 'No Authentication' },
            { status: 401 }
        )

    if (!userId)
        return NextResponse.json(
            { message: 'Validation Error' },
            { status: 401 }
        )

    const response = await fetch(ApiUrl('chat', 'chat_fetch'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
    const json = await response.json()

    if (response.ok) {
        return NextResponse.json(json, { status: 200 })
    }

    return NextResponse.json(json, { status: response.status })
}
