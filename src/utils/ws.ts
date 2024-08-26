// ws.ts

const ws = new WebSocket('ws://localhost:3006')

// Handle WebSocket events
ws.onopen = () => {
    console.log('WebSocket connection opened')

    // Send a signUp request to the server
    const signUpRequest = {
        method: 'signUp',
        payload: {
            email: 'user@example.com',
            password: 'securepassword'
        }
    }
    ws.send(JSON.stringify(signUpRequest))
}

ws.onmessage = (event: MessageEvent) => {
    console.log(true)
    try {
        const data = JSON.parse(event.data)
        if (data.event === 'signUpResponse') {
            console.log('Received signUp response:', data.payload)
        }
    } catch (error) {
        console.error('Error parsing message:', error)
    }
}

ws.onerror = (error: Event) => {
    console.error('WebSocket error:', error)
}

ws.onclose = (event: CloseEvent) => {
    console.log('WebSocket connection closed:', event.reason)
}

export { ws }
