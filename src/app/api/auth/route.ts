import { NextRequest } from 'next/server'
import { AuthenticationUser } from '@/class/auth'

export async function POST(request: NextRequest) {
    const auth = new AuthenticationUser(request)

    return auth.finishResponse()
}
