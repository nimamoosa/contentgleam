'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Button, Checkbox, Input, Link, Spinner } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { MdEmail, MdPassword } from 'react-icons/md'
import { useAuth } from '@/contexts/authProvider'
import { Container } from '@/components/display'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

export default function Home() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()
    const { user, loading, setUser } = useAuth()

    useEffect(() => {
        if (loading) return

        if (user.email !== '') {
            router.push('/dashboard')
        }
    }, [user, loading])

    const validatePassword = (password: string): boolean => {
        const minLength = 8
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return regex.test(password)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validatePassword(password)) {
            setError(
                'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
            )
            return
        }

        if (error !== '') return

        setIsLoading(true)

        const response = await fetch('/api/auth', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        const json = await response.json()
        const data = json.data

        if (response.status === 201) {
            setUser({
                email: data.email,
                password: data.password,
                role: data.role,
                point: {
                    points: data.point.points || 30
                },
                userId: data.userId
            })

            Swal.fire({
                icon: 'success',
                title: 'Sign Up Successfully',
                text: 'You have successfully signed up.',
                timer: 3000,
                timerProgressBar: true
            }).then(() => {
                router.push('/dashboard')
            })
        } else if (response.status === 200) {
            setUser({
                email: email,
                password: password,
                role: data.role || 'user',
                point: {
                    points: data.point.points || 30
                },
                userId: data.userId
            })

            Swal.fire({
                icon: 'success',
                title: 'Login Successfully',
                text: 'You have successfully logged in.',
                timer: 3000,
                timerProgressBar: true
            }).then(() => {
                router.push('/dashboard')
            })
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer
                    toast.onmouseleave = Swal.resumeTimer
                }
            })
            Toast.fire({
                icon: 'error',
                title: json.message
            })

            setIsLoading(false)
        }
    }

    return (
        <main className="flex h-[100vh] flex-col items-center justify-center">
            <form
                className="w-[35%] h-[70vh] flex flex-col items-center rounded-lg bg-blue-800/80 transition-all duration-250 max-sm:w-[90%] max-md:w-[70%] max-[1000px]:w-[60%] max-[1100px]:w-[50%]"
                onSubmit={handleSubmit}>
                <Container
                    justify="center"
                    flexDecoration="col"
                    alignItems="center"
                    className="mt-4">
                    <h3 className="text-2xl font-medium tracking-tighter">
                        Welcome to{' '}
                        <span className="text-blue-200">ContentGleam AI</span>
                    </h3>
                    <span className="mt-2 text-white/70">
                        Auth your account to continue
                    </span>
                </Container>
                <Container justify="center" className="mt-3 w-full">
                    <Input
                        type="email"
                        startContent={<MdEmail />}
                        label={'Email Address'}
                        className="w-[70%] max-sm:w-[90%]"
                        variant="bordered"
                        value={email}
                        isDisabled={isLoading || loading}
                        onChange={(e) => setEmail(e.target.value)}
                        color="default"
                        classNames={{
                            inputWrapper:
                                'border-white/30 rounded-b-none data-[hover=true]:border-white data-[focus=true]:bg-transparent/10 transition-all duration-400'
                        }}
                        required
                    />
                </Container>
                <Container justify="center" className="w-full">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        startContent={<MdPassword />}
                        endContent={
                            showPassword ? (
                                <BsEyeSlash
                                    className="cursor-pointer text-[20px]"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <BsEye
                                    className="cursor-pointer text-[20px]"
                                    onClick={() => setShowPassword(true)}
                                />
                            )
                        }
                        label={'Password'}
                        className="w-[70%] max-sm:w-[90%]"
                        variant="bordered"
                        value={password}
                        isDisabled={isLoading || loading}
                        onChange={(e) => {
                            setError('')
                            setPassword(e.target.value)
                        }}
                        color="default"
                        isInvalid={error !== '' ? true : false}
                        errorMessage={error}
                        classNames={{
                            inputWrapper:
                                'border-white/30 rounded-t-none data-[hover=true]:border-white data-[focus=true]:bg-transparent/10'
                        }}
                        required
                    />
                </Container>

                <Container
                    alignItems="center"
                    justify="between"
                    className="mt-5 w-[70%] max-sm:w-[90%]">
                    <div>
                        <Checkbox />
                        <span>Remember Me</span>
                    </div>
                    <div>
                        <Link href="#" className="text-gray-500 cursor-pointer">
                            Forget Password ?
                        </Link>
                    </div>
                </Container>

                <Container
                    justify="center"
                    alignItems="center"
                    className="mt-16 w-full">
                    <Button
                        disableRipple
                        type="submit"
                        isDisabled={isLoading || loading}
                        className="relative overflow-visible w-[50%] rounded-xl hover:-translate-y-1 px-12 shadow-xl bg-background/60 after:content-[''] after:absolute after:rounded-xl after:inset-0 after:bg-background/60 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
                        size="md">
                        Login
                    </Button>
                </Container>
                {isLoading ||
                    (loading && (
                        <div className="mt-10">
                            <Spinner>Checking Data.....</Spinner>
                        </div>
                    ))}
            </form>
        </main>
    )
}
