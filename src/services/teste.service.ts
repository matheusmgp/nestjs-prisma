import { Injectable } from '@nestjs/common';

export interface ITesteService {
  teste(): string;
}
export const ITesteService = Symbol('ITesteService');
@Injectable()
export class TesteService implements ITesteService {
  teste(): string {
    return 'usando interface';
  }
}
