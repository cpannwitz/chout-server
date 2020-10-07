import { Module } from '@nestjs/common'
import { OrmService } from './orm.service'

@Module({
  imports: [],
  controllers: [],
  providers: [OrmService],
  exports: [OrmService]
})
export class OrmModule {}
