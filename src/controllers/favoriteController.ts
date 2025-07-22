import { Request, Response } from 'express'
import { FavoriteService } from '../services/favoriteService'
import { validateDTO } from '../utils/validation'
import { User } from '../entities/User'
import { AddFavoriteDto } from '../utils/dtos'

interface AuthRequest extends Request {
  user?: User
}

export class FavoriteController {
  private favoriteService = new FavoriteService()

  async getFavorites(req: AuthRequest, res: Response): Promise<Response> {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
      const favorites = await this.favoriteService.getFavoritesByUser(req.user)
      return res.status(200).json(favorites)
    } catch (error) {
      console.error('Error getting favorites:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async addFavorite(req: AuthRequest, res: Response): Promise<Response> {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const addFavoriteDto = new AddFavoriteDto()
    Object.assign(addFavoriteDto, req.body)

    const errors = await validateDTO(addFavoriteDto)
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ errors: errors.map((err) => err.constraints) })
    }

    try {
      const favorite = await this.favoriteService.addFavorite(
        req.user,
        addFavoriteDto.animalName
      )
      return res.status(201).json(favorite)
    } catch (error) {
      console.error('Error adding favorite:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}
