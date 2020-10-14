import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { DEFAULT_AUTH_STRATEGY } from '../../auth/auth.constants'

@Injectable()
export class RestAuthGuard extends AuthGuard(DEFAULT_AUTH_STRATEGY) {}
