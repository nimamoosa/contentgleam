import { ApiUrl } from '@/app/api/utils/apiUrl'
import { NextRequest, NextResponse } from 'next/server'
import getClientInfo from '@/app/api/utils/clientInfo'
import jwt from 'jsonwebtoken'

interface User {
    email: string
    password: string
}

interface UserLogout {
    userId: string
}

class AuthenticationUser {
    private request: NextRequest
    private bodyData: User | null = null // Store parsed body data

    constructor(request: NextRequest) {
        this.request = request
    }

    private async getBodyData(): Promise<User> {
        if (this.bodyData === null) {
            // Read and parse the request body
            const { email, password }: User = await this.request.json()
            this.bodyData = { email, password }
        }
        return this.bodyData
    }

    private async checkBody(): Promise<boolean> {
        const { email, password } = await this.getBodyData()
        return !!(email && password) // Return true if both email and password are present
    }

    private async sendRequest() {
        const { email, password } = await this.getBodyData()

        const responseAuth = await fetch(ApiUrl('auth', 'authentication'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                remember: true
            })
        })

        const json = await responseAuth.json()

        return {
            json,
            responseAuth
        }
    }

    private createdFn(json: any) {
        const response = NextResponse.json({ data: json.data }, { status: 201 })

        response.cookies.set('session', json.data.token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 // 30 days
        })

        return response
    }

    private okFn(json: any) {
        const response = NextResponse.json({ data: json.data }, { status: 200 })

        response.cookies.set('session', json.data.token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 // 30 days
        })

        return response
    }

    public async finishResponse() {
        const { json, responseAuth } = await this.sendRequest()
        const checkIt = await this.checkBody()

        if (!checkIt) {
            return NextResponse.json(
                { message: 'Validation Error' },
                { status: 400 }
            )
        }

        if (responseAuth.status === 201) {
            return this.createdFn(json)
        }

        if (responseAuth.ok) {
            return this.okFn(json)
        }

        return NextResponse.json(
            { message: json.message },
            { status: responseAuth.status }
        )
    }
}

class UserFetcher {
    private request: NextRequest

    constructor(request: NextRequest) {
        this.request = request
    }

    private async getSessionCookie(): Promise<string | undefined> {
        const cookie = this.request.cookies.get('session')
        return cookie?.value
    }

    private async fetchUser(token: string): Promise<any> {
        const response = await fetch(ApiUrl('auth', 'fetch_user'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        })

        const json = await response.json()
        return { response, json }
    }

    private createErrorResponse(message: string, status: number): NextResponse {
        return NextResponse.json({ message }, { status })
    }

    public async handleRequest(): Promise<NextResponse> {
        try {
            const token = await this.getSessionCookie()

            if (!token) {
                return this.createErrorResponse('No Session Found', 400)
            }

            const { response, json } = await this.fetchUser(token)

            if (response.status === 200) {
                return NextResponse.json(
                    { message: json.message, data: json.data },
                    { status: 200 }
                )
            }

            return this.createErrorResponse(json.message, response.status)
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'An unknown error occurred'
            return this.createErrorResponse(message, 500)
        }
    }
}

class LogoutUser {
    private request: NextRequest
    private bodyData: UserLogout | null = null

    constructor(request: NextRequest) {
        this.request = request
    }

    private createError(
        message: string | object,
        init?: ResponseInit
    ): NextResponse {
        return NextResponse.json(message, init)
    }

    private async getBodyData(): Promise<UserLogout> {
        if (this.bodyData === null) {
            const { userId }: UserLogout = await this.request.json()
            this.bodyData = { userId }
        }

        return this.bodyData
    }

    private async checkBody(): Promise<boolean> {
        const { userId } = await this.getBodyData()
        if (!userId) return false

        return true
    }

    private async createRequest(): Promise<Response> {
        const { userId } = await this.getBodyData()

        const response = await fetch(ApiUrl('auth', 'logout'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })

        return response
    }

    private deleteCookies(message: string | object, init: ResponseInit) {
        const response = NextResponse.json(message, init)
        response.cookies.delete('session')

        return response
    }

    public async finishResponse() {
        const checkIt = await this.checkBody()

        if (!checkIt)
            return this.createError(
                { message: 'Validation Error' },
                { status: 400 }
            )

        const request = await this.createRequest()
        const json = await request.json()

        if (!request.ok)
            return this.createError(
                { message: json.message },
                { status: request.status }
            )

        return this.deleteCookies(
            { message: json.message },
            { status: request.status }
        )
    }
}

class PointUpdate {
    static readonly ALLOWED_ORIGIN: string =
        process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || ''
    static readonly JWT_SECRET: string =
        process.env.NEXT_PUBLIC_JWT_SECRET || ''
    static readonly SECRET_KEY: string =
        process.env.NEXT_PUBLIC_SECRET_KEY || ''
    private request: NextRequest

    constructor(request: NextRequest) {
        this.request = request
    }

    private responseMessage<
        T = string,
        O = object,
        I extends ResponseInit = ResponseInit
    >(message: T | O, init: I): NextResponse<T | O> {
        return NextResponse.json(message, init)
    }

    private async checkOrigin() {
        const origin = this.request.headers.get('origin')
        const referer = this.request.headers.get('referer')

        if (
            origin !== PointUpdate.ALLOWED_ORIGIN &&
            referer &&
            !referer.startsWith(PointUpdate.ALLOWED_ORIGIN)
        ) {
            return false
        }

        return true
    }

    private async banedUser() {
        const clientInfo = await getClientInfo(this.request)
        const newToken = jwt.sign(clientInfo, PointUpdate.JWT_SECRET, {
            expiresIn: '1d'
        })

        await fetch(ApiUrl('sec', 'new_'), {
            method: 'POST',
            body: JSON.stringify({ token: newToken })
        })

        return this.responseMessage(
            { message: 'Unknown Error' },
            { status: 403 }
        )
    }

    private async tokenCheck() {
        const authHeader = this.request.headers.get('authorization')

        if (!authHeader || authHeader.startsWith('Bearer ')) return false

        return true
    }

    private cookiesCheck(): boolean {
        const cookies = this.request.cookies.get('session')

        if (cookies?.value === '') return false

        return true
    }
}

export { AuthenticationUser, UserFetcher, LogoutUser }
