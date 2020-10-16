import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IQueryInfo } from 'accesscontrol'
import { InjectRolesBuilder, RolesBuilder, Role as ACLRole } from 'nest-access-control'
import { Role } from '@prisma/client'
import { User } from '../../user/user.entity'

@Injectable()
export class GqlACGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRolesBuilder() private readonly roleBuilder: RolesBuilder
  ) {}

  protected async getUser(context: ExecutionContext): Promise<User> {
    const req = context.switchToHttp().getRequest<{ user: User }>()
    return req.user
  }

  protected async getUserRole(context: ExecutionContext): Promise<Role> {
    const user = await this.getUser(context)
    if (!user) throw new UnauthorizedException()
    return user.role
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<ACLRole[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }

    const userRole = await this.getUserRole(context)
    const hasRoles = roles.every(role => {
      const queryInfo: IQueryInfo = role
      queryInfo.role = userRole
      const permission = this.roleBuilder.permission(queryInfo)
      return permission.granted
    })
    if (!hasRoles) throw new ForbiddenException()
    return hasRoles
  }
}
