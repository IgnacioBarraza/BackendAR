import { Request, Response } from 'express'
import { AuthService } from '../services/authService'
import { validateDTO } from '../utils/validation'
import { RegisterUserDto, LoginUserDto } from '../utils/dtos'

export class AuthController {
  private authService: AuthService

  constructor(auth: AuthService) {
    this.authService = auth
  }

  async register(req: Request, res: Response): Promise<Response> {
    const registerDto = new RegisterUserDto()
    Object.assign(registerDto, req.body)

    const errors = await validateDTO(registerDto)
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ errors: errors.map((err) => err.constraints) })
    }

    try {
      const user = await this.authService.register(
        registerDto.email,
        registerDto.password
      )
      return res
        .status(201)
        .json({ message: 'User registered successfully', userId: user.id })
    } catch (error: any) {
      if (error.code === '23505') {
        // PostgreSQL unique violation error code
        return res.status(409).json({ message: 'Email already exists' })
      }
      console.error('Error registering user:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const loginDto = new LoginUserDto()
    Object.assign(loginDto, req.body)

    const errors = await validateDTO(loginDto)
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ errors: errors.map((err) => err.constraints) })
    }

    try {
      const token = await this.authService.login(
        loginDto.email,
        loginDto.password
      )

      if (!token) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      return res.status(200).json({ token })
    } catch (error) {
      console.error('Error logging in user:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}
