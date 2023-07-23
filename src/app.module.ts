import { Module } from '@nestjs/common';
import { AppService, IAppService } from './services/app.service';
import { AppController } from './controllers/app.controller';
import { ITesteService, TesteService } from './services/teste.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    { provide: IAppService, useClass: AppService },
    { provide: ITesteService, useClass: TesteService },
    AppService,
    TesteService,
  ],
})
export class AppModule {}
