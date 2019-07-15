import uuid from 'uuid'
import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BaseEntity,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
  ManyToOne
} from 'typeorm'
import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { User } from '../user/User.entity'
import { Category } from '../category/Category.entity'
import { Location } from '../location/Location.entity'

@InputType('EventInput') // type-graphql needed for every entity
@ObjectType('EventObject') // type-graphql needed for every entity
@Entity('events') // table name in PG
export class Event extends BaseEntity {
  @Field(type => User)
  @ManyToOne(type => User, user => user.eventsCreated, { eager: true })
  author: User

  @Field(type => [Category], { nullable: true })
  // @ManyToMany(type => Category, category => category.eventCategories, { eager: true })
  @ManyToMany(type => Category, { nullable: true, eager: true })
  @JoinTable()
  categories?: Category[]

  @Field(type => String)
  @Column('varchar')
  title: string

  @Field(type => Location)
  @ManyToOne(type => Location, location => location.events, { eager: true })
  location: Location

  @Field(type => Date)
  @Column('timestamp with time zone', { nullable: true })
  startTime?: Date

  @Field(type => Date)
  @Column('timestamp with time zone', { nullable: true })
  endTime?: Date

  @Field(type => String)
  @Column('varchar', { nullable: true })
  description?: string

  @Field(type => Number)
  @Column('real', { nullable: true })
  pricing?: number

  @Field(type => String)
  @Column('varchar', { nullable: true })
  pricingUnit?: string

  @Field(type => Number)
  @Column('int', { nullable: true })
  ageRestriction?: number

  // * ============================== CUSTOMIZATION
  @Field(type => String)
  @Column('varchar', { nullable: true })
  image?: string

  @Field(type => String)
  @Column('varchar', { nullable: true })
  backgroundImage?: string

  @Field(type => String)
  @Column('varchar', { nullable: true })
  color?: string

  // * ============================== MODERATION
  @Field(type => [User], { nullable: true })
  @ManyToMany(type => User, user => user.eventsModerated, { nullable: true, eager: true })
  @JoinTable()
  moderators?: User[]

  @Field(type => [User], { nullable: true })
  @ManyToMany(type => User, user => user.eventsSubscribed, {
    nullable: true,
    eager: true
  })
  @JoinTable()
  subscribers?: User[]

  @Field(type => [User], { nullable: true })
  @ManyToMany(type => User, user => user.eventsAttended, { nullable: true, eager: true })
  @JoinTable()
  attendees?: User[]

  @Field(type => [User], { nullable: true })
  @ManyToMany(type => User, user => user.eventsAttendedOnBehalf, {
    nullable: true,
    eager: true
  })
  @JoinTable()
  attendeesOnBehalf?: User[]

  @Field(type => [User], { nullable: true })
  @ManyToMany(type => User, user => user.eventsInvited, { nullable: true, eager: true })
  @JoinTable()
  attendeesInvited?: User[]

  // * ============================== FLAGS
  @Field(type => Boolean, { nullable: true })
  @Column('boolean', { nullable: true })
  isPrivate?: boolean

  @Field(type => Boolean, { nullable: true })
  @Column('boolean', { nullable: true })
  isCapacityLimited?: boolean

  @Field(type => Boolean, { nullable: true })
  @Column('boolean', { nullable: true })
  isFreeInvite?: boolean

  // * ============================== META
  @Field(type => ID)
  @PrimaryColumn('uuid', { unique: true }) // table column type
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

// assets: Assets[]
// Discussion: Discussion
