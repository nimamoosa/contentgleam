'use client'

import { AuthTypes } from '@/types/auth'
import { usePathname, useRouter } from 'next/navigation'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from 'react'

interface AuthContextProps {
    user: AuthTypes
    setUser: Dispatch<SetStateAction<AuthTypes>>
    loading: boolean
}

const AuthContext = createContext<AuthContextProps>({
    user: {
        userId: '',
        email: '',
        password: '',
        point: { points: 0 },
        role: 'user'
    },
    setUser: () => {},
    loading: true
})

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthTypes>({
        email: '',
        password: '',
        userId: '',
        point: {
            points: 0
        },
        role: 'user'
    })
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const request = async () => {
            try {
                const response = await fetch('/api/auth/fetch_information', {
                    method: 'POST'
                })

                if (response.status === 200) {
                    const json = await response.json()

                    setUser({
                        email: json.data.email,
                        password: json.data.password,
                        role: json.data.role,
                        point: {
                            points: json.data.point.pointes
                        },
                        userId: json.data.userId
                    })
                    setLoading(false)
                } else {
                    if (pathname.includes('/dashboard')) router.push('/')
                    setTimeout(() => setLoading(false), 1000)
                }
            } catch (error) {}
        }

        request()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
