import { NextRequest, NextResponse } from 'next/server'
import { ApiUrl } from '../../utils/apiUrl'

export const POST = async (request: NextRequest) => {
    const { userId }: { userId: string } = await request.json()
    const cookies = request.cookies.get('session')

    console.log(userId)

    if (!cookies?.value)
        return NextResponse.json({ message: 'No User Found' }, { status: 400 })

    const response = await fetch(ApiUrl('ai_chat_model', 'fetch_ai_chat'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
    const json = await response.json()

    if (response.ok) {
        return NextResponse.json(
            { message: json.message, data: json.data },
            { status: 200 }
        )
    }

    return NextResponse.json(json, { status: 401 })
}
