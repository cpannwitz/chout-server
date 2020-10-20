import { registerAs } from '@nestjs/config'
import { RolesBuilder } from 'nest-access-control'
import { Role } from '@prisma/client'

export enum ACLResources {
  USER = 'USER',
  ORGANISATION = 'ORGANISATION'
}

export default registerAs('accessControl', () => {
  const roles: RolesBuilder = new RolesBuilder()

  roles
    // User
    .grant(Role.USER)
    .readOwn(ACLResources.USER)
    .updateOwn(ACLResources.USER)
    // Organisation
    .grant(Role.ORGANISATION)
    .extend(Role.USER)
    .readOwn(ACLResources.ORGANISATION)
    .updateOwn(ACLResources.ORGANISATION)
    // Moderator
    .grant(Role.MODERATOR)
    .extend(Role.USER)
    .read(ACLResources.USER)
    .update(ACLResources.USER)
    .read(ACLResources.ORGANISATION)
    .update(ACLResources.ORGANISATION)
    // Admin
    .grant(Role.ADMIN)
    .extend(Role.MODERATOR)
    .read(ACLResources.USER)
    .create(ACLResources.USER)
    .update(ACLResources.USER)
    .delete(ACLResources.USER)
    .read(ACLResources.ORGANISATION)
    .create(ACLResources.ORGANISATION)
    .update(ACLResources.ORGANISATION)
    .delete(ACLResources.ORGANISATION)

  return roles
})
