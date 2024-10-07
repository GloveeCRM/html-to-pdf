import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  async generatePDFFromHTML(htmlContent: string, format: any): Promise<any> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(htmlContent);
    const buffer = await page.pdf({ format: format });
    await browser.close();
    return buffer;
  }
}
