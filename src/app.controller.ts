import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { GeneratePDFFromHTMLRequestDto } from './dto/generate-pdf-from-html-request.dto';

@Controller('generate-pdf-from-html')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post()
  async generatePDFFromHTMLHandler(
    @Body() { htmlContent, format }: GeneratePDFFromHTMLRequestDto,
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
    } catch (error) {
      console.error('Error generating PDF', error);
      res.status(500).send('Error generating PDF');
    }
  }
}
