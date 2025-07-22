import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/jwt'

export const generateToken = (userId: number): string => {
  const payload = { userId }
  const secret: jwt.Secret = JWT_SECRET
  const options: jwt.SignOptions = { expiresIn: '2h' }
  return jwt.sign(payload, secret, options)
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
}
