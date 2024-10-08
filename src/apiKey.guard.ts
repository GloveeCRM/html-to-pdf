import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ApiKeyService } from './apiKey.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      return false;
    }

    // Validate the API key
    const validApiKey = await this.apiKeyService.validateApiKey(apiKey);
    if (!validApiKey) {
      return false;
    }

    return true;
  }
}
