import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ApiKeyService } from './apiKey.service';
import { RequestLogService } from './requestLog.service';
import { Request } from 'express';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private readonly apiKeyService: ApiKeyService,
    private readonly requestLogService: RequestLogService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'] as string;

    if (!apiKey) {
      throw new ForbiddenException('API key is missing');
    }

    // Validate the API key and get its details
    const apiKeyEntity = await this.apiKeyService.validateApiKey(apiKey);
    if (!apiKeyEntity) {
      throw new ForbiddenException('Invalid API key');
    }

    const currentTime = new Date();
    const oneMinuteAgo = new Date(currentTime.getTime() - 60 * 1000);

    // Get the number of requests made by this API key to this endpoint in the past 1 minute
    const requestCount = await this.requestLogService.countRequests({
      apiKey: apiKeyEntity.api_key,
      endpoint: request.url,
      since: oneMinuteAgo,
    });

    // Check if the request count exceeds the rate limit
    if (requestCount >= apiKeyEntity.limit_per_minute) {
      throw new ForbiddenException('You have exceeded your rate limit');
    }

    // Allow the request to proceed if the rate limit is not exceeded
    return true;
  }
}
