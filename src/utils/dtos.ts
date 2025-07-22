import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator'

export class RegisterUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(30, { message: 'Password must not exceed 30 characters' })
  password!: string
}

export class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string
}

export class AddFavoriteDto {
  @IsString()
  @MinLength(1, { message: 'Animal name cannot be empty' })
  animalName!: string
}
