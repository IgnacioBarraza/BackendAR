import { AppDataSource } from '../config/database'
import { Favorite } from '../entities/Favorite'
import { User } from '../entities/User'

export class FavoriteService {
  private favoriteRepository = AppDataSource.getRepository(Favorite)

  async getFavoritesByUser(user: User): Promise<Favorite[]> {
    return this.favoriteRepository.find({
      where: { user: { id: user.id } },
      relations: ['user'],
    })
  }

  async addFavorite(user: User, animalName: string): Promise<Favorite> {
    const favorite = new Favorite()
    favorite.user = user
    favorite.animalName = animalName
    return this.favoriteRepository.save(favorite)
  }
}
