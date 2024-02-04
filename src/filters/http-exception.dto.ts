import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class HttpExceptionDto {
  @ApiProperty({ example: '500|404|403|400', required: true })
  @IsNumber()
  statusCode: number;

  @ApiProperty({ example: '2024-02-04T13:06:01.530Z', required: true })
  @IsString()
  timestamp: string;

  @ApiProperty({ example: '/reports', required: true })
  @IsString()
  path: string;

  @ApiProperty({ example: 'Something went wrong!', required: true })
  @IsString()
  message: string;
}
