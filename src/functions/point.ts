import { AuthUser } from '@/types/auth'
import { ChatTypes } from '@/types/chat'
import { Dispatch, SetStateAction } from 'react'

export default async function updateUserPoints(
    token: string,
    userChat: ChatTypes | undefined | null,
    setUser: Dispatch<SetStateAction<AuthUser>>,
    user: AuthUser
) {
    const responsePoints = await fetch('/api/auth/points', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ e: userChat?.model })
    })

    const jsonPoints = await responsePoints.json()
    setUser({
        ...user,
        point: { points: jsonPoints.data }
    })
}
