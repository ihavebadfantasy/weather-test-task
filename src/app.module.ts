import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ReportsModule } from './reports/reports.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST') || '',
          port: Number(configService.get<string>('DB_PORT')) || 3643,
          username: configService.get<string>('DB_USER') || '',
          password: configService.get<string>('DB_PASSWORD') || '',
          database: configService.get<string>('DB_NAME') || '',
          entities: [],
          synchronize:
            Boolean(configService.get<string>('DB_SYNCRONIZE')) || false,
          autoLoadEntities:
            Boolean(configService.get<string>('DB_AUTO_LOAD_ENTITIES')) ||
            false,
        };
      },
    }),
    ReportsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
