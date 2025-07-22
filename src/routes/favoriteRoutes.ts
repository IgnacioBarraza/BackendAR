import { Router } from 'express'
import { FavoriteController } from '../controllers/favoriteController'
import { authMiddleware } from '../middleware/auth'

const favoriteController = new FavoriteController()
export const favRouter = Router()

favRouter.use(authMiddleware)

favRouter.get('/', favoriteController.getFavorites)
favRouter.post('/', favoriteController.addFavorite)
