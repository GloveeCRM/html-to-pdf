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
  }): Promise<RequestLog> {
    const newLog = this.requestLogRepository.create(log);
    const savedLog = await this.requestLogRepository.save(newLog);
    return savedLog;
  }

  async countRequests({
    apiKey,
    endpoint,
    since,
  }: {
    apiKey: string;
    endpoint: string;
    since: Date;
  }): Promise<number> {
    return this.requestLogRepository
      .createQueryBuilder('request_log')
      .where('request_log.apiKey = :apiKey', { apiKey })
      .andWhere('request_log.endpoint = :endpoint', { endpoint })
      .andWhere('request_log.requestTime >= :since', { since })
      .getCount(); // This will count the number of matching rows
  }
}
