import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
export type Maybe<T> = T | null
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
  /** GeoJSON Point - Coordinates */
  GeoPoint: any
}

export type Category = {
  __typename?: 'Category'
  name: Scalars['String']
  eventCategories: Array<Event>
  userInterests: Array<User>
  id: Scalars['ID']
}

export type CreateEventInput = {
  title: Scalars['String']
  location: Array<Scalars['GeoPoint']>
}

export type Event = {
  __typename?: 'Event'
  author: User
  categories: Array<Category>
  title: Scalars['String']
  location: Array<Scalars['GeoPoint']>
  startTime: Scalars['DateTime']
  endTime: Scalars['DateTime']
  description: Scalars['String']
  pricing: Scalars['Float']
  pricingUnit: Scalars['String']
  ageRestriction: Scalars['Float']
  image: Scalars['String']
  backgroundImage: Scalars['String']
  color: Scalars['String']
  moderators: Array<User>
  subscribers: Array<User>
  attendees: Array<User>
  attendeesOnBehalf: Array<User>
  attendeesInvited: Array<User>
  isPrivate: Scalars['Boolean']
  isCapacityLimited: Scalars['Boolean']
  isFreeInvite: Scalars['Boolean']
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type Mutation = {
  __typename?: 'Mutation'
  createEvent: Event
  registerUser: User
}

export type MutationCreateEventArgs = {
  data: CreateEventInput
}

export type MutationRegisterUserArgs = {
  data: RegisterUserInput
}

export type Query = {
  __typename?: 'Query'
  getEvents: Array<Event>
  me: User
  getUsers: Array<User>
}

export type QueryGetEventsArgs = {
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type QueryGetUsersArgs = {
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type RegisterUserInput = {
  email: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type Response = {
  __typename?: 'Response'
  error: Scalars['Boolean']
  path: Scalars['String']
  message: Scalars['String']
  stacktrace: Scalars['String']
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
  image: Scalars['String']
  interests: Array<Category>
  usersBlocked: Array<User>
  usersFriended: Array<User>
  eventsCreated: Array<Event>
  eventsSubscribed: Array<Event>
  eventsAttended: Array<Event>
  eventsAttendedOnBehalf: Array<Event>
  eventsInvited: Array<Event>
  eventsModerated: Array<Event>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {}
  Int: Scalars['Int']
  Event: Event
  User: User
  String: Scalars['String']
  Category: Category
  ID: Scalars['ID']
  DateTime: Scalars['DateTime']
  GeoPoint: Scalars['GeoPoint']
  Float: Scalars['Float']
  Boolean: Scalars['Boolean']
  Mutation: {}
  CreateEventInput: CreateEventInput
  RegisterUserInput: RegisterUserInput
  Response: Response
}

export type CategoryResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Category']
> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  eventCategories?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>
  userInterests?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type EventResolvers<ContextType = any, ParentType = ResolversTypes['Event']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  location?: Resolver<Array<ResolversTypes['GeoPoint']>, ParentType, ContextType>
  startTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  endTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  pricing?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  pricingUnit?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  ageRestriction?: Resolver<ResolversTypes['Float'], ParentType, ContextType>
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  backgroundImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  moderators?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  subscribers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  attendees?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  attendeesOnBehalf?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  attendeesInvited?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  isPrivate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isCapacityLimited?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isFreeInvite?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
}

export interface GeoPointScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['GeoPoint'], any> {
  name: 'GeoPoint'
}

export type MutationResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Mutation']
> = {
  createEvent?: Resolver<
    ResolversTypes['Event'],
    ParentType,
    ContextType,
    MutationCreateEventArgs
  >
  registerUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    MutationRegisterUserArgs
  >
}

export type QueryResolvers<ContextType = any, ParentType = ResolversTypes['Query']> = {
  getEvents?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType,
    QueryGetEventsArgs
  >
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  getUsers?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    QueryGetUsersArgs
  >
}

export type ResponseResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Response']
> = {
  error?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  stacktrace?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type UserResolvers<ContextType = any, ParentType = ResolversTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  interests?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>
  usersBlocked?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  usersFriended?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>
  eventsCreated?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>
  eventsSubscribed?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>
  eventsAttended?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>
  eventsAttendedOnBehalf?: Resolver<
    Array<ResolversTypes['Event']>,
    ParentType,
    ContextType
  >
  eventsInvited?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>
  eventsModerated?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  Category?: CategoryResolvers<ContextType>
  DateTime?: GraphQLScalarType
  Event?: EventResolvers<ContextType>
  GeoPoint?: GraphQLScalarType
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Response?: ResponseResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
