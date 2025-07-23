import { Router } from 'express'
import { AuthController } from '../controllers/authController'
import { AuthService } from '../services/authService'

const authService = new AuthService()
const authController = new AuthController(authService)
export const authRouter = Router()

authRouter.post('/register', (req, res) => authController.register(req, res))
authRouter.post('/login', (req, res) => authController.login(req, res))
