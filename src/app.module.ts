import { Module } from '@nestjs/common';
import { AppService, IAppService } from './services/app.service';
import { AppController } from './controllers/app.controller';
import { ITesteService, TesteService } from './services/teste.service';
import { IUserService, UserService } from './services/user.service';
import { IUserRepository, UserRepository } from './repositories/user.repository';
import { IPrismaService, PrismaService } from './services/prisma.service';
import { HttpCustomResponse, IHttpCustomResponse } from './response/http-custom-response';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    { provide: IAppService, useClass: AppService },
    { provide: ITesteService, useClass: TesteService },
    {
      provide: IUserService,
      useClass: UserService,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IPrismaService,
      useClass: PrismaService,
    },
    {
      provide: IHttpCustomResponse,
      useClass: HttpCustomResponse,
    },
    AppService,
    TesteService,
  ],
})
export class AppModule {}
