import { Resolver, Query, Args, Mutation, Arg } from 'type-graphql'
import { Repository, getRepository } from 'typeorm'
import { Location } from './Location.entity'
import { GetLocationsArgs, CreateLocationInput } from './Location.types'
import { User } from '../user/User.entity'

@Resolver(Location)
export class LocationResolver {
  constructor(
    private repository: Repository<Location>,
    private userrepository: Repository<User>
  ) {
    this.repository = getRepository(Location)
    this.userrepository = getRepository(User)
  }

  @Query(returns => [Location])
  async getLocations(@Args() { skip, take }: GetLocationsArgs) {
    try {
      const locations = await this.repository.find({
        skip,
        take
      })
      return locations
    } catch (err) {
      return err
    }
  }

  @Mutation(returns => Location)
  async createLocation(@Arg('data') data: CreateLocationInput) {
    const { coordinates, name, description, author } = data

    const userAuthor = await this.userrepository.findOneOrFail({
      where: { id: author }
    })

    if (!userAuthor) {
      return null
      // TODO: better error message
    }

    const newLocation = await this.repository
      .create({
        name,
        coordinates,
        description,
        author: userAuthor
      })
      .save()
    // await this.userrepository.update(userAuthor.id, {
    //   eventsCreated:
    //     userAuthor && userAuthor.eventsCreated
    //       ? [...userAuthor.eventsCreated, newEvent]
    //       : [newEvent]
    // })
    return newLocation
  }
}
