import { Controller, Get, Injectable } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import * as fs from 'fs';
import { join } from 'path';

@ApiTags('Swagger')
@Controller('swagger-static')
export class SwaggerController {
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Find swagger',
  })
  async findAll() {
    const fileContent = await fs.readFileSync(join(__dirname, 'static/file.json'), 'utf8');
    return JSON.parse(fileContent);
  }
}