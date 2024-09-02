import { NextRequest, NextResponse } from 'next/server'
import { ApiUrl } from '../../utils/apiUrl'
import { LogoutUser } from '@/class/auth'

export const POST = async (request: NextRequest) => {
    const logout = new LogoutUser(request)

    return logout.finishResponse()
}
