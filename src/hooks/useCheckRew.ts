import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const useCheckRew = (
    token: string | null,
    id: string | null,
    us: string | null
) => {
    const [error, setError] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        if (!token || !id || !us) {
            setError(true)

            setTimeout(() => router.replace('/dashboard'), 3000)
        } else {
            setError(false)
        }
    }, [token, id, us])

    return { error }
}

export default useCheckRew
