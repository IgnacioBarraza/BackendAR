import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm'
import { User } from './User'

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, (user) => user.favorites)
  user!: User

  @Column()
  animalName!: string

  @CreateDateColumn()
  createdAt!: Date
}
