import { secret_key } from '../../../../lib/secret_key'
import jwt from 'jsonwebtoken'

export const decoded = (key: string) => jwt.verify(key || '', secret_key)
