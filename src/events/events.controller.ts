import { Controller, Get, Post, Param, Body, Query, Put, Delete } from '@nestjs/common'
import { Event } from './interfaces/event.interface'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { ListAllEvents } from './dto/listall-events.dto'

@Controller('events')
export class EventsController {
  // constructor() {}

  @Get()
  findAll(@Query() query: ListAllEvents): Event[] {
    return []
  }

  @Get(':id')
  findOne(@Param('id') id: string): Event | undefined {
    return undefined
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto): Event | undefined {
    return undefined
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return undefined
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return undefined
  }
}
