import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Favorite } from './Favorite'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true, nullable: false })
  email!: string

  @Column({ nullable: false })
  password!: string

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites!: Favorite[]
}
