import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
// interceptors
import { Serialize } from '../interceptors/serialize.interceptor';
// dependencies
import { ReportsService } from './reports.service';
import { CreateWeatherReportDto } from './dtos/create-weather-report.dto';
import { ShortWeatherReportDto } from './dtos/short-weather-report.dto';
import { GetWeatherReportDto } from './dtos/get-weather-report.dto';
import { HttpExceptionDto } from '../filters/http-exception.dto';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully fetched.',
    type: ShortWeatherReportDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Wrong request query string param/s.',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: 404,
    description: 'The record not found.',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Unknown error.',
    type: HttpExceptionDto,
  })
  @Serialize(ShortWeatherReportDto)
  getWeatherReport(
    @Query() query: GetWeatherReportDto,
  ): Promise<ShortWeatherReportDto> {
    return this.reportsService.getWeatherReport(query);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created/updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Wrong request body param/s.',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Something went wrong when fetching the report from OPENWeather API',
    type: HttpExceptionDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Unknown error.',
    type: HttpExceptionDto,
  })
  @ApiBody({
    type: CreateWeatherReportDto,
    description: 'Json structure for create report request body',
  })
  createWeatherReport(@Body() body: CreateWeatherReportDto) {
    return this.reportsService.create(body);
  }
}
