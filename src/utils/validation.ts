import { validate, ValidationError } from 'class-validator'

export const validateDTO = async (dto: any): Promise<ValidationError[]> => {
  const errors = await validate(dto)
  return errors
}
