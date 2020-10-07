import { Resolver, Query, Args } from '@nestjs/graphql'

@Resolver()
export class AppResolver {
  @Query(_returns => String)
  helloWorld(): string {
    return 'Hello World!'
  }
  @Query(_returns => String)
  hello(@Args('name') name: string): string {
    return `Hello ${name}!`
  }
}
