import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from './apiKey.entity';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
  ) {}

  async validateApiKey(apiKey: string): Promise<ApiKey | null> {
    const validApiKey = await this.apiKeyRepository.findOne({
      where: {
        api_key: apiKey,
      },
    });

    return validApiKey || null;
  }
}
