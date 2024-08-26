/**
 * Sends chat data to the API.
 * @param {any} body - The body object to send to the API.
 * @param {string} token - Token used to encode data.
 * @param {string} secret - Secret key to create the token.
 * @returns {Promise<Response>} API response.
 */

import { Enc } from './token'

export default async function postChatData(
    body: any,
    token: string,
    secret: string
) {
    return await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enc: Enc(JSON.stringify(body), secret) })
    })
}
