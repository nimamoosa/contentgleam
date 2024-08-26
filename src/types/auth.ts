export interface AuthUser extends AuthTypes {
    email: string
    password: string
}

export type AuthTypes = {
    userId: string
    email: string
    password: string
    point: {
        points: number
    }
    role: 'owner' | 'user' | 'premium'
}
