import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export abstract class IPrismaService extends PrismaClient {
  abstract onModuleInit();
}
@Injectable()
export class PrismaService extends IPrismaService implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
