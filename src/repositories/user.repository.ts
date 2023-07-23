import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { IPrismaService } from '../services/prisma.service';

export interface IUserRepository {
  getById(id: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: string, data: any): Promise<User>;
  delete(id: string): Promise<User>;
  deleteAll(): Promise<any>;
  getByEmail(email: string): Promise<User | null>;
}
export const IUserRepository = Symbol('IUserRepository');

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: IPrismaService) {}

  async getById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
  }
  async getByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: string, data: any): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
  async deleteAll(): Promise<any> {
    return this.prisma.user.deleteMany({});
  }
}
