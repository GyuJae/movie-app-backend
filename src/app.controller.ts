import { Controller, Get, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('')
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get('imgFile')
  async handler(@Res() res: Response) {
    try {
      const response = await (
        await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${this.configService.get(
            'CF_ACCOUNT_ID',
          )}/images/v2/direct_upload`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${this.configService.get('CF_API_TOKEN')}`,
            },
          },
        )
      ).json();
      return res.status(200).json({
        ok: true,
        ...response.result,
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        error: `Error Occured ${error}`,
      });
    }
  }
}
