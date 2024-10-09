import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ApiKeyService } from './apiKey.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new ForbiddenException('API key is required');
    }

    // Validate the API key
    const validApiKey = await this.apiKeyService.validateApiKey(apiKey);
    if (!validApiKey) {
      throw new ForbiddenException('Invalid API key');
    }

    request.apiKey = validApiKey;
    return true;
  }
}
