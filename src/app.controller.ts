import { Controller, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';
import { GeneratePDFFromHTMLRequestDto } from './dto/generate-pdf-from-html-request.dto';
import { ApiKeyGuard } from './apiKey.guard';
import { RequestLogService } from './requestLog.service';
import { ApiKeyService } from './apiKey.service';
import { RateLimitGuard } from './rateLimit.guard';

@Controller('generate-pdf-from-html')
@UseGuards(ApiKeyGuard, RateLimitGuard)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly apiKeyService: ApiKeyService,
    private readonly requestLogService: RequestLogService,
  ) {}

  @Post()
  async generatePDFFromHTMLHandler(
    @Body() { htmlContent, format }: GeneratePDFFromHTMLRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const pdfBuffer = await this.appService.generatePDFFromHTML(
        htmlContent,
        format,
      );
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Length', pdfBuffer.length);

      res.status(200).end(pdfBuffer);

      const apiKeyHeader = req.headers['x-api-key'] as string;
      const apiKeyEntity =
        await this.apiKeyService.validateApiKey(apiKeyHeader);

      if (!apiKeyEntity) {
        console.log('Invalid API Key');
      } else {
        const reqLog = await this.requestLogService.logRequest({
          endpoint: req.url,
          requestMethod: req.method,
          requestTime: new Date(),
          apiKey: apiKeyEntity,
        });
        console.log('Request logged', reqLog);
      }
    } catch (error) {
      console.error('Error generating PDF', error);
      res.status(500).send('Error generating PDF');
    }
  }
}
