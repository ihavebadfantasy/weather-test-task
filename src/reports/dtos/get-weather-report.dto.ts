import { ApiProperty } from '@nestjs/swagger';
import { IsLongitude, IsLatitude, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetWeatherReportDto {
  @ApiProperty({ example: '41.6528', required: true })
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lon: number;

  @ApiProperty({ example: '-4.7236', required: true })
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;

  @ApiProperty({
    example: 'hourly,daily',
    required: false,
  })
  @IsString()
  @IsOptional()
  part?: string;
}
