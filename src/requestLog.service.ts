import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestLog } from './requestLog.entity';
import { ApiKey } from './apiKey.entity';

@Injectable()
export class RequestLogService {
  constructor(
    @InjectRepository(RequestLog)
    private readonly requestLogRepository: Repository<RequestLog>,
  ) {}

  async logRequest(log: {
    endpoint: string;
    requestMethod: string;
    requestTime: Date;
    apiKey: ApiKey;
  }): Promise<void> {
    const newLog = this.requestLogRepository.create(log);
    await this.requestLogRepository.save(newLog);
  }
}
