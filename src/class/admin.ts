import { ApiUrl } from '@/app/api/utils/apiUrl'
import { DecJET, EncJET } from '@/functions/token'
import { NextRequest, NextResponse } from 'next/server'

interface Admin {
    username: string
    password: string
}

class LoginAdmin {
    private request: NextRequest
    private bodyData: Admin | null = null
    static readonly SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || ''

    constructor(request: NextRequest) {
        this.request = request
    }

    private responseMessage<
        M = string | object,
        I extends ResponseInit = ResponseInit
    >(message: M, init?: I): NextResponse<M> {
        return NextResponse.json(message, init)
    }

    private async getBodyData(): Promise<Admin> {
        if (this.bodyData == null) {
            const { username, password }: Admin = await this.request.json()

            this.bodyData = { username, password }
        }

        return this.bodyData
    }

    private async checkBody(): Promise<boolean> {
        const { username, password } = await this.getBodyData()

        if (!username || !password) return false

        return true
    }

    private async createRequest(): Promise<Response> {
        const { username, password } = await this.getBodyData()

        const response = await fetch(ApiUrl('admin', 'login_a'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })

        return response
    }

    private async okFn<M = string, D = string | object | any>(
        message: M,
        data: D
    ) {
        const response = this.responseMessage(
            { message, data },
            { status: 200 }
        )
        const d = data as { adminId: string }

        response.cookies.set('ad', EncJET(d.adminId, LoginAdmin.SECRET_KEY))

        return response
    }

    public async finishResponse() {
        const checkIt = await this.checkBody()

        if (!checkIt)
            return this.responseMessage(
                { message: 'Validation Error' },
                { status: 400 }
            )

        const sendRequest = await this.createRequest()

        const json = await sendRequest.json()

        if (sendRequest.ok) return this.okFn(json.message as string, json.data)

        return this.responseMessage(
            { message: json.message, data: json.data },
            { status: sendRequest.status }
        )
    }
}

class AdminFetcher {
    private request: NextRequest

    constructor(request: NextRequest) {
        this.request = request
    }

    private responseMessage<
        M = string | object,
        I extends ResponseInit = ResponseInit
    >(message: M, init?: I): NextResponse<M> {
        return NextResponse.json(message, init)
    }

    private sessionCookies() {
        const cookies = this.request.cookies.get('ad')

        return cookies?.value
    }

    private decodedCookies() {
        const dec = DecJET(this.sessionCookies() || '', LoginAdmin.SECRET_KEY)

        return dec
    }

    private async createRequest() {
        const { message } = this.decodedCookies()

        const response = await fetch(ApiUrl('admin', 'fetch_admin'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ adminId: message })
        })

        return response
    }

    public async finishResponse() {
        const response = await this.createRequest()
        const json = await response.json()
        const { status } = this.decodedCookies()

        if (status === 'error')
            return this.responseMessage(
                { message: 'No Admin Found' },
                { status: 404 }
            )

        if (response.ok)
            return this.responseMessage(
                { message: json.message },
                { status: response.status }
            )

        return this.responseMessage(
            { message: json.message },
            { status: response.status }
        )
    }
}

export { LoginAdmin, AdminFetcher }
