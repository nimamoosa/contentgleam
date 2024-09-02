import { NextRequest } from 'next/server'
import { UserFetcher } from '@/class/auth'

export const POST = async (request: NextRequest) => {
    const user = new UserFetcher(request)

    return user.handleRequest()
}
