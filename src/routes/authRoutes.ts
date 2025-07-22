import { Router } from 'express'
import { AuthController } from '../controllers/authController'

const authController = new AuthController()
export const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
