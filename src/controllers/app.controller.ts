import { Controller, Get, Inject } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppService, IAppService } from 'src/services/app.service';
import { ITesteService, TesteService } from 'src/services/teste.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: IAppService,
    @Inject(ITesteService) private readonly testeService: ITesteService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('teste')
  getTeste(): string {
    return this.testeService.teste();
  }
}
