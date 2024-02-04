import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
export class ShortWeatherReportDto {
  @ApiProperty({
    example: 1706930275,
    required: true,
  })
  @Transform(({ obj }) => obj?.current?.sunrise || null)
  @Expose()
  sunrise: number | null;

  @ApiProperty({
    example: 1706974576,
    required: true,
  })
  @Transform(({ obj }) => obj?.current?.sunset || null)
  @Expose()
  sunset: number | null;

  @ApiProperty({
    example: 301.24,
    required: true,
  })
  @Transform(({ obj }) => obj?.current?.temp || null)
  @Expose()
  temp: number | null;

  @ApiProperty({
    example: 303.99,
    required: true,
  })
  @Transform(({ obj }) => obj?.current?.feels_like || null)
  @Expose()
  feels_like: number | null;

  @ApiProperty({
    example: 1011,
    required: true,
  })
  @Transform(({ obj }) => obj?.current?.pressure || null)
  @Expose()
  pressure: number | null;

  @ApiProperty({
    example: 70,
    required: true,
  })
  @Transform(({ obj }) => obj?.current?.humidity || null)
  @Expose()
  humidity: number | null;

  @ApiProperty({
    example: 11.41,
    required: true,
  })
  @Transform(({ obj }) => obj?.current?.uvi || null)
  @Expose()
  uvi: number | null;

  @ApiProperty({
    example: 3.62,
    required: true,
  })
  @Transform(({ obj }) => obj?.current?.wind_speed || null)
  @Expose()
  wind_speed: number | null;
}
