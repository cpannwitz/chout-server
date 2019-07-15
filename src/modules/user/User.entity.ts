import uuid from 'uuid'
import { ObjectType, Field, ID, InputType } from 'type-graphql'
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
import { Event } from '../event/Event.entity'
import { Category } from '../category/Category.entity'
import { cryptoEncode } from '../../utils/crypto'
import { Location } from '../location/Location.entity'

@InputType('UserInput')
@ObjectType('UserObject') // type-graphql needed for every entity
@Entity('users') // table name in PG
export class User extends BaseEntity {
  // * ============================== PROFILE
  @Field(type => String)
  @Column('varchar')
  email: string

  @Field(type => Boolean, { nullable: true })
  @Column('boolean', { nullable: true })
  verified?: boolean

  @Field(type => String, { nullable: true })
  @Column('varchar', { nullable: true, select: false })
  password?: string

  @Field(type => String, { nullable: true })
  @Column('varchar', { nullable: true })
  username?: string

  @Field(type => String, { nullable: true })
  @Column('varchar', { nullable: true })
  image?: string

  // * ============================== EVENTS

  // @ManyToMany(type => Category, category => category.userInterests, { eager: true })
  @ManyToMany(type => Category, { eager: true })
  @JoinTable()
  @Field(type => [Category, { nullable: true }])
  interests?: Category[]

  @ManyToMany(type => User, user => user.usersBlocked)
  @JoinTable()
  @Field(type => [User], { nullable: true })
  usersBlocked?: User[]

  @ManyToMany(type => User, user => user.usersFriended)
  @JoinTable()
  @Field(type => [User], { nullable: true })
  usersFriended?: User[]

  @OneToMany(type => Location, location => location.author)
  @Field(type => [Location], { nullable: true })
  locationsCreated?: Location[]

  @OneToMany(type => Event, event => event.author)
  @Field(type => [Event], { nullable: true })
  eventsCreated?: Event[]

  @ManyToMany(type => Event, event => event.subscribers)
  @JoinTable()
  @Field(type => [Event], { nullable: true })
  eventsSubscribed?: Event[]

  @ManyToMany(type => Event, event => event.attendees)
  @JoinTable()
  @Field(type => [Event], { nullable: true })
  eventsAttended?: Event[]

  @ManyToMany(type => Event, event => event.attendeesOnBehalf)
  @JoinTable()
  @Field(type => [Event], { nullable: true })
  eventsAttendedOnBehalf?: Event[]

  @ManyToMany(type => Event, event => event.attendeesInvited)
  @JoinTable()
  @Field(type => [Event], { nullable: true })
  eventsInvited?: Event[]

  @ManyToMany(type => Event, event => event.moderators)
  @JoinTable()
  @Field(type => [Event], { nullable: true })
  eventsModerated?: Event[]

  // * ============================== SOCIAL

  @Field(type => String, { nullable: true })
  @Column('varchar', { nullable: true, unique: true }) // table column type
  twitterId?: string

  @Field(type => String, { nullable: true })
  @Column('varchar', { nullable: true, unique: true }) // table column type
  facebookId?: string

  @Field(type => String, { nullable: true })
  @Column('varchar', { nullable: true, unique: true }) // table column type
  googleId?: string

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
    if (this.password) {
      this.password = await cryptoEncode(this.password)
    }
  }
  @BeforeUpdate()
  async beforeUpdate() {
    this.updatedAt = new Date()
  }
}
