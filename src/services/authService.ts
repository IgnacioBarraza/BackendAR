import { AppDataSource } from '../config/database'
import { User } from '../entities/User'
import { hashPassword, comparePassword } from '../utils/password'
import { generateToken } from '../utils/jwt'

export class AuthService {
  private userRepository = AppDataSource.getRepository(User)

  async register(email: string, password: string): Promise<User> {
    const hashedPassword = await hashPassword(password)
    const user = new User()
    user.email = email
    user.password = hashedPassword
    return this.userRepository.save(user)
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOneBy({ email })

    if (!user) {
      return null // User not found
    }

    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      return null // Invalid password
    }

    return generateToken(user.id)
  }
}
