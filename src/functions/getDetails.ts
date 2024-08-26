const getDetails = async (
    token: string,
    _t: string,
    onSuccess: (json: { message: string; data: string | object | any }) => void,
    onReject: (e_message: string) => void,
    onCatch: (e: Error) => void
): Promise<void> => {
    try {
        const response = await fetch('', {
            method: 'POST',
            body: JSON.stringify({ token: token, _t: _t })
        })
        const json = (await response.json()) as {
            message: string
            data: string | object | any
        }

        if (response.status == 200) {
            return onSuccess(json)
        } else {
            onReject(json.message)
        }
    } catch (error) {
        onCatch(error as Error)
    }
}

export default getDetails
