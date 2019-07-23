import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BaseEntity,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm'
import { hashPassword, generateUuid } from './User.utils'
import { Event } from '../event/Event.entity'
import { Category } from '../category/Category.entity'
import { Location } from '../location/Location.entity'

@Entity('users') // table name in PG
export class User extends BaseEntity {
  // * ============================== PROFILE
  @Column('varchar')
  email: string

  @Column('boolean', { nullable: true })
  verified?: boolean

  @Column('varchar', { nullable: true, select: false })
  password?: string

  @Column('varchar', { nullable: true })
  username?: string

  @Column('varchar', { nullable: true })
  image?: string

  // * ============================== EVENTS

  // @ManyToMany(type => Category, category => category.userInterests, { eager: true })
  @ManyToMany(type => Category, { eager: true })
  @JoinTable()
  interests?: Category[]

  @ManyToMany(type => User, user => user.usersBlocked)
  @JoinTable()
  usersBlocked?: User[]

  @ManyToMany(type => User, user => user.usersFriended)
  @JoinTable()
  usersFriended?: User[]

  @OneToMany(type => Location, location => location.author)
  locationsCreated?: Location[]

  @OneToMany(type => Event, event => event.author)
  eventsCreated?: Event[]

  @ManyToMany(type => Event, event => event.subscribers)
  @JoinTable()
  eventsSubscribed?: Event[]

  @ManyToMany(type => Event, event => event.attendees)
  @JoinTable()
  eventsAttended?: Event[]

  @ManyToMany(type => Event, event => event.attendeesOnBehalf)
  @JoinTable()
  eventsAttendedOnBehalf?: Event[]

  @ManyToMany(type => Event, event => event.attendeesInvited)
  @JoinTable()
  eventsInvited?: Event[]

  @ManyToMany(type => Event, event => event.moderators)
  @JoinTable()
  eventsModerated?: Event[]

  // * ============================== SOCIAL

  @Column('varchar', { nullable: true, unique: true }) // table column type
  twitterId?: string

  @Column('varchar', { nullable: true, unique: true }) // table column type
  facebookId?: string

  @Column('varchar', { nullable: true, unique: true }) // table column type
  googleId?: string

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
    if (this.password) {
      this.password = await hashPassword(this.password)
    }
  }
  @BeforeUpdate()
  async beforeUpdate() {
    this.updatedAt = new Date()
  }
}
