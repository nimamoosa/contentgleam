import { NextRequest } from 'next/server'
import { UAParser } from 'ua-parser-js'

const getClientInfo = async (req: NextRequest) => {
    const ip =
        req.headers.get('x-forwarded-for') || req.headers.get('host') || ''

    const userAgent = req.headers.get('user-agent') || ''
    const acceptLanguage = req.headers.get('accept-language') || ''
    const cookies = req.headers.get('cookie') || ''
    const method = req.method || 'Unknown Method'
    const url = req.url || ''
    const path = new URL(url).pathname
    const contentType =
        req.headers.get('content-type') || 'Unknown Content-Type'
    const protocol =
        req.headers.get('x-forwarded-proto') ||
        (req.url?.startsWith('https') ? 'https' : 'http')
    const requestTime = new Date().toISOString()

    const parser = new UAParser(userAgent)
    const browser = parser.getBrowser()
    const browserName = browser.name || 'Unknown Browser'
    const browserVersion = browser.version || 'Unknown Version'

    const parseUserAgent = (userAgent: string) => {
        const platform =
            userAgent.match(/\(([^)]+)\)/)?.[1] || 'Unknown Platform'
        const modelMatch = userAgent.match(
            /(iPhone|iPad|iPod|Android|Windows Phone|BlackBerry|SM-G|SM-N|GT-|SCH-|HTC|Nexus|Pixel|LG|Moto|A[0-9]|Xiaomi)[^\)]+/g
        )
        const model = modelMatch ? modelMatch.join(', ') : 'Unknown Model'

        return { platform, model }
    }

    const getGeolocation = async (ip: string) => {
        try {
            const response = await fetch(
                `https://ipinfo.io/${ip}/json?token=7ba58821afeaf6`
            )
            const json = await response.json()
            return json
        } catch (error) {
            console.error('Error fetching geolocation:', error)
            return {}
        }
    }

    const { platform, model } = parseUserAgent(userAgent)
    const geolocation = await getGeolocation(ip)

    return {
        ip,
        userAgent,
        platform,
        model,
        browserName,
        browserVersion,
        acceptLanguage,
        cookies,
        method,
        url,
        path,
        contentType,
        protocol,
        requestTime,
        geolocation
    }
}

export default getClientInfo
