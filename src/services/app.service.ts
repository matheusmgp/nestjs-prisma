import { Injectable } from '@nestjs/common';

export abstract class IAppService {
  abstract getHello(): string;
}
@Injectable()
export class AppService implements IAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
