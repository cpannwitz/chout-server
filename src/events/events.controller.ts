import { Controller, Get, Post, Param, Body, Query, Put, Delete, Inject } from '@nestjs/common'
import { Logger } from 'winston'
import { Event } from './interfaces/event.interface'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { ListAllEvents } from './dto/listall-events.dto'

@Controller('events')
export class EventsController {
  constructor(@Inject('winston') private readonly logger: Logger) {}

  @Get()
  findAll(@Query() query: ListAllEvents): Event[] {
    this.logger.info(`findAll(): query: `, query)
    return []
  }

  @Get(':id')
  findOne(@Param('id') id: string): Event | undefined {
    this.logger.info(`findOne(): id: `, id)
    return undefined
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto): Event | undefined {
    this.logger.info(`create(): createEventDto: `, createEventDto)
    return undefined
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    this.logger.info(`update(): id: `, id)
    this.logger.info(`update(): updateEventDto: `, updateEventDto)
    return undefined
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.info(`delete(): id: `, id)
    return undefined
  }
}
