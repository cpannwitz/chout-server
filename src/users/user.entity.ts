import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { AuthProvider } from '../auth/auth.types'

@Entity('users') // table name in PG
export class User {
  // ? entity fields
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  // ? account fields - HIDDEN DEFAULT
  @Column('text')
  email: string

  @Column('boolean', { default: false, select: false })
  verified: boolean

  @Column({
    type: 'enum',
    enum: AuthProvider,
    select: false
  })
  provider: AuthProvider

  @Column('text', { select: false })
  providerId: string

  // ? profile fields
  @Column('text')
  username: string

  @Column('text', { nullable: true })
  image: string | null
}
