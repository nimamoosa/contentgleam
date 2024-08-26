import getDetails from '@/functions/getDetails'
import { EncJET } from '@/functions/token'
import generateToken from '@/utils/token/token'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const useGetRewDetails = (
    token: string | null,
    id: string | null,
    us: string | null,
    secret_key: string,
    error: boolean
) => {
    const [details, setDetails] = useState<{ message: string }>({
        message: ''
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const token_jet = EncJET(JSON.stringify({ token, id, us }), secret_key)
    const router = useRouter()

    useEffect(() => {
        if (!error) {
            const glbMessage = '\nthis page was close after 4 secondes'

            getDetails(
                generateToken(secret_key),
                token_jet,
                (json) => {
                    setDetails({ message: json.message + glbMessage })
                    setIsLoading(false)
                    setTimeout(() => router.push('/dashboard/profile'), 4000)
                },
                (e_message) => {
                    setDetails({ message: e_message + glbMessage })
                    setIsLoading(false)
                    setTimeout(() => router.push('/dashboard'), 4000)
                },
                (e) => {
                    setDetails({ message: e.message + glbMessage })
                    setIsLoading(false)
                    setTimeout(() => router.push('/dashboard/profile'), 4000)
                }
            )
        }
    }, [error])

    return { details }
}

export default useGetRewDetails
