import { Controller, Get, Injectable } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('home')
@Controller('/')
export class HomeController {
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Find home',
  })
  async findAll() {
    console.log('Find home status Ok!');

    return { status: 'ok' };
  }
}