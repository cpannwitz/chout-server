import uuid from 'uuid'
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
import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { Event } from '../event/Event.entity'
import GeoPoint from '../../graphql/scalars/GeoPoint'
import { User } from '../user/User.entity'

@InputType('LocationInput') // type-graphql needed for every entity
@ObjectType('LocationObject') // type-graphql needed for every entity
@Entity('locations') // table name in PG
export class Location extends BaseEntity {
  @OneToMany(type => Event, event => event.location)
  @Field(type => [Event], { nullable: true })
  events: Event[]

  @Field(type => User)
  @ManyToOne(type => User, user => user.locationsCreated, { eager: true })
  author: User

  @Field(type => GeoPoint)
  @Column('point', {
    transformer: {
      from: v => [v.x, v.y],
      to: v => `${v[0]},${v[1]}`
    }
  })
  coordinates: [number, number]

  @Field(type => String, { nullable: true })
  @Column('varchar', { nullable: true })
  name?: string

  @Field(type => String, { nullable: true })
  @Column('varchar', { nullable: true })
  description?: string

  @Field(type => Boolean)
  @Column('boolean')
  verified?: boolean

  // * ============================== META
  @Field(type => ID)
  @PrimaryColumn('uuid', { update: false, unique: true }) // table column type
  id: string

  @Field(type => Date)
  @Column('timestamp with time zone')
  createdAt: Date

  @Field(type => Date)
  @Column('timestamp with time zone')
  updatedAt: Date

  @BeforeInsert()
  async beforeInsert() {
    this.id = uuid.v4()
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
  @BeforeUpdate()
  async beforeUpdate() {
    this.updatedAt = new Date()
  }
}
