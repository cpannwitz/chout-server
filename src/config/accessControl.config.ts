import { registerAs } from '@nestjs/config'
import { RolesBuilder } from 'nest-access-control'

export enum ACLRoles {
  user = 'user',
  organisation = 'organisation',
  moderator = 'moderator',
  admin = 'admin'
}

export enum ACLResources {
  user = 'user'
}

// implement into app.module.ts
// AccessControlModule.forRootAsync({
//   inject: [ConfigService],
//   useFactory: (config: ConfigService) => config.get('accessControl') || ({} as RolesBuilder)
// }),

export default registerAs('accessControl', () => {
  const roles: RolesBuilder = new RolesBuilder()

  roles
    // User
    .grant(ACLRoles.user)
    .readOwn(ACLResources.user)
    .updateOwn(ACLResources.user)
    .grant(ACLRoles.organisation)
    .extend(ACLRoles.user)
    .grant(ACLRoles.moderator)
    .extend(ACLRoles.user)
    .readAny(ACLResources.user)
    .updateAny(ACLResources.user)
    .grant(ACLRoles.admin)
    .extend(ACLRoles.moderator)
    .readAny(ACLResources.user)
    .createAny(ACLResources.user)
    .updateAny(ACLResources.user)
    .deleteAny(ACLResources.user)

  return roles
})
