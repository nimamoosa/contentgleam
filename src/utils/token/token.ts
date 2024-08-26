import CryptoJS from 'crypto-js'

const generateToken = (secret: string) => {
    const timestamp = new Date().toISOString()
    const token = CryptoJS.AES.encrypt(timestamp, secret).toString()
    return token
}

export default generateToken
