import uuid from 'uuid'
import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BaseEntity
  // ManyToMany,
  // JoinTable
} from 'typeorm'

@Entity('category') // table name in PG
export class Category extends BaseEntity {
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
  @PrimaryColumn('uuid', { unique: true }) // table column type
  id: string

  @BeforeInsert()
  async beforeInsert() {
    this.id = uuid.v4()
  }
}

// related ?
// 0-10 spectrum values ?
