import { NextRequest, NextResponse } from 'next/server'
import { ApiUrl } from '../../utils/apiUrl'

export const POST = async (request: NextRequest) => {
    const { userId }: { userId: string } = await request.json()

    const res = await fetch(ApiUrl('auth', 'logout'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    })
    const json = await res.json()

    if (res.status !== 200) {
        return NextResponse.json(
            { message: json.message },
            { status: res.status }
        )
    }

    // Create the NextResponse object
    const response = NextResponse.json(
        { message: json.message },
        { status: 200 }
    )

    // Delete the session cookie
    response.cookies.delete('session')

    // Return the NextResponse object
    return response
}
