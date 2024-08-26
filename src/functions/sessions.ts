import { NextRequest } from 'next/server'
import { secret_key } from '../../lib/secret_key'
import jwt from 'jsonwebtoken'

export interface userProps {
    userId: string
}

export default function sessionGet(request: NextRequest) {
    const cookies = request.cookies.get('sessions')
    const token = cookies?.value
    const { userId } = jwt.verify(token as string, secret_key) as userProps
    return userId
}
