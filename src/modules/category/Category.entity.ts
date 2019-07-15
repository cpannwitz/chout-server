import uuid from 'uuid'
import { ObjectType, Field, ID, InputType } from 'type-graphql'
import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BaseEntity
  // ManyToMany,
  // JoinTable
} from 'typeorm'

@InputType('CategoryInput') // type-graphql needed for every entity
@ObjectType('CategoryObject') // type-graphql needed for every entity
@Entity('category') // table name in PG
export class Category extends BaseEntity {
  @Field(type => String)
  @Column('varchar', { unique: true })
  name: string

  // @Field(type => [Event], { nullable: true })
  // @ManyToMany(type => Event, event => event.categories)
  // @JoinTable()
  // eventCategories?: Event[]

  // @Field(type => [User], { nullable: true })
  // @ManyToMany(type => User, user => user.interests)
  // @JoinTable()
  // userInterests?: User[]

  // * ============================== META
  @Field(type => ID)
  @PrimaryColumn('uuid', { unique: true }) // table column type
  id: string

  @BeforeInsert()
  async beforeInsert() {
    this.id = uuid.v4()
  }
}

// related ?
// 0-10 spectrum values ?
