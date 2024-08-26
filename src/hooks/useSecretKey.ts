import { useEffect, useState } from 'react'

const useSecretKey = () => {
    const [sec, setSec] = useState('')

    useEffect(() => {
        const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY

        if (secretKey) {
            setSec(secretKey)
        }
    }, [])

    return sec
}

export default useSecretKey
