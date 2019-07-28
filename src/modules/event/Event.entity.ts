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
import { generateUuid } from './Event.utils'
import { User } from '../user/User.entity'
import { Category } from '../category/Category.entity'
import { Location } from '../location/Location.entity'

@Entity('events') // table name in PG
export class Event extends BaseEntity {
  @ManyToOne(type => User, user => user.eventsCreated, { eager: true })
  author: User

  // @ManyToMany(type => Category, category => category.eventCategories, { eager: true })
  @ManyToMany(type => Category, { nullable: true, eager: true })
  @JoinTable()
  categories?: Category[]

  @Column('varchar')
  title: string

  @ManyToOne(type => Location, location => location.events, { eager: true })
  location: Location

  @Column('timestamp with time zone', { nullable: true })
  startTime?: Date

  @Column('timestamp with time zone', { nullable: true })
  endTime?: Date

  @Column('varchar', { nullable: true })
  description?: string

  @Column('real', { nullable: true })
  pricing?: number

  @Column('varchar', { nullable: true })
  pricingUnit?: string

  @Column('int', { nullable: true })
  ageRestriction?: number

  // * ============================== CUSTOMIZATION
  @Column('varchar', { nullable: true })
  image?: string

  @Column('varchar', { nullable: true })
  backgroundImage?: string

  @Column('varchar', { nullable: true })
  color?: string

  // * ============================== MODERATION
  @ManyToMany(type => User, user => user.eventsModerated, { nullable: true, eager: true })
  @JoinTable()
  moderators?: User[]

  @ManyToMany(type => User, user => user.eventsSubscribed, {
    nullable: true,
    eager: true
  })
  @JoinTable()
  subscribers?: User[]

  @ManyToMany(type => User, user => user.eventsAttended, { nullable: true, eager: true })
  @JoinTable()
  attendees?: User[]

  @ManyToMany(type => User, user => user.eventsAttendedOnBehalf, {
    nullable: true,
    eager: true
  })
  @JoinTable()
  attendeesOnBehalf?: User[]

  @ManyToMany(type => User, user => user.eventsInvited, { nullable: true, eager: true })
  @JoinTable()
  attendeesInvited?: User[]

  // * ============================== FLAGS
  @Column('boolean', { nullable: true })
  isPrivate?: boolean

  @Column('boolean', { nullable: true })
  isCapacityLimited?: boolean

  @Column('boolean', { nullable: true })
  isFreeInvite?: boolean

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

// assets: Assets[]
// Discussion: Discussion
