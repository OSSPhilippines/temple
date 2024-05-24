import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHomePage(@Res() res: Response) {
    return res.render('page', {
      title: this.appService.getTitle(),
      description: this.appService.getDescription(),
      start: this.appService.getStart(),
      list: this.appService.getList(),
    });
  }
}
