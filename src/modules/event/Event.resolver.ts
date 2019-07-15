import { Resolver, Query, Args, Mutation, Ctx, Arg } from 'type-graphql'
import { Repository, getRepository } from 'typeorm'
import { Event } from './Event.entity'
import { GetEventsArgs, CreateEventInput } from './Event.types'
import { User } from '../user/User.entity'
import { Location } from '../location/Location.entity'

@Resolver(Event)
export class UserResolver {
  constructor(
    private repository: Repository<Event>,
    private userrepository: Repository<User>,
    private locationrepository: Repository<Location>
  ) {
    this.repository = getRepository(Event)
    this.userrepository = getRepository(User)
    this.locationrepository = getRepository(Location)
  }

  @Query(returns => [Event])
  async getEvents(@Args() { skip, take }: GetEventsArgs) {
    try {
      const events = await this.repository.find({
        // relations: ['users'],
        skip,
        take
        // loadEagerRelations: true,
        // loadRelationIds: true
      })
      return events
    } catch (err) {
      return err
    }
  }

  @Mutation(returns => Event)
  async createEvent(@Arg('data') data: CreateEventInput) {
    const { title, location, author } = data
    console.log('LOG | : createEvent -> title, location', title, location)

    const userAuthor = await this.userrepository.findOneOrFail({
      where: { id: author }
    })

    const eventLocation = await this.locationrepository.findOneOrFail({
      where: { id: location }
    })

    if (!userAuthor || !eventLocation) {
      return null
      // TODO: better error message
    }

    const newEvent = await this.repository
      .create({
        title,
        location: eventLocation,
        author: userAuthor
      })
      .save()
    // await this.userrepository.update(userAuthor.id, {
    //   eventsCreated:
    //     userAuthor && userAuthor.eventsCreated
    //       ? [...userAuthor.eventsCreated, newEvent]
    //       : [newEvent]
    // })
    return newEvent
  }
}
