import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BaseEntity,
  BeforeUpdate,
  OneToMany,
  ManyToOne
} from 'typeorm'
import { generateUuid } from './Location.utils'
import { Event } from '../event/Event.entity'
import { User } from '../user/User.entity'

@Entity('locations') // table name in PG
export class Location extends BaseEntity {
  @OneToMany(type => Event, event => event.location)
  events: Event[]

  @ManyToOne(type => User, user => user.locationsCreated, { eager: true })
  author: User

  @Column('point', {
    transformer: {
      from: v => [v.x, v.y],
      to: v => `${v[0]},${v[1]}`
    }
  })
  coordinates: [number, number]

  @Column('varchar', { nullable: true })
  name?: string

  @Column('varchar', { nullable: true })
  description?: string

  @Column('boolean')
  verified?: boolean

  // * ============================== META
  @PrimaryColumn('uuid', { unique: true }) // table column type
  id: string

  @Column('timestamp with time zone')
  createdAt: Date

  @Column('timestamp with time zone')
  updatedAt: Date

  @BeforeInsert()
  async beforeInsert() {
    this.id = generateUuid()
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
  @BeforeUpdate()
  async beforeUpdate() {
    this.updatedAt = new Date()
  }
}
