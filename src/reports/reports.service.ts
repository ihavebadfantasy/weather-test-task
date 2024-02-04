import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Report } from './report.entity';
import { CreateWeatherReportDto } from './dtos/create-weather-report.dto';
import { GetWeatherReportDto } from './dtos/get-weather-report.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ReportsService {
  apiKey: string;
  getReportUrl: string;

  constructor(
    @InjectRepository(Report) private repo: Repository<Report>,
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY') || '';
    this.getReportUrl = 'https://api.openweathermap.org/data/3.0/onecall?';
  }

  async getWeatherReport(query: GetWeatherReportDto) {
    const report = await this.findOne(query);
    if (!report) {
      throw new NotFoundException();
    }

    return JSON.parse(report.contents);
  }

  async findOne(report: Partial<Report>) {
    const reports = report.part
      ? await this.repo.find({ where: report })
      : await this.repo.find({
          where: { ...report, part: IsNull() },
        });

    if (!reports[0]?.id) {
      return null;
    }

    return reports[0];
  }

  async create({ lon, lat, part }: CreateWeatherReportDto) {
    const reportData = await this.fetchWeatherData(lon, lat, part);

    let report = await this.findOne({ lon, lat, part });
    if (report) {
      // report with given params(lat, lon, part) already exists - updating contents
      report.contents = JSON.stringify(reportData);
    } else {
      // create new
      report = this.repo.create({
        lon: reportData.lon,
        lat: reportData.lat,
        part: part || null,
        contents: JSON.stringify(reportData),
      });
    }

    await this.repo.save(report);
  }

  async fetchWeatherData(lon: number, lat: number, part?: string) {
    const url = part
      ? `${this.getReportUrl}lat=${lat}&lon=${lon}&exclude=${part}&appid=${this.apiKey}`
      : `${this.getReportUrl}lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

    const { data } = await firstValueFrom(
      this.httpService.get<any>(url).pipe(
        catchError((error: AxiosError) => {
          const errObj: { cod?: number; message?: string } =
            error.response.data;
          throw new HttpException(
            errObj?.message || 'Something went wrong when fetching the report.',
            errObj?.cod || HttpStatus.FORBIDDEN,
          );
        }),
      ),
    );

    return data;
  }
}
