import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUserRepository } from '../repositories/user.repository';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

export interface IUserService {
  getById(id: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  create(data: CreateUserDto): Promise<User>;
  update(id: string, data: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<User>;
  deleteAll(): Promise<any>;
}
export const IUserService = Symbol('IUserService');
@Injectable()
export class UserService implements IUserService {
  constructor(@Inject(IUserRepository) private readonly repo: IUserRepository) {}

  async getById(id: string): Promise<User | null> {
    const data = await this.repo.getById(id);
    if (data === null) {
      throw new NotFoundException([`Usuario ${id} não encontrado.`]);
    }
    return data;
  }

  async getAll(): Promise<User[]> {
    return await this.repo.getAll();
  }

  async create(data: CreateUserDto): Promise<User> {
    const foundByEmail = await this.repo.getByEmail(data.email);
    if (foundByEmail) throw new BadRequestException(`Email ${data.email} já cadastrado`);
    return await this.repo.create(data);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const retorno = await this.repo.getById(id);
    if (retorno === null) {
      throw new NotFoundException([`Usuario ${id} não encontrado.`]);
    }
    const foundByEmail = await this.repo.getByEmail(data.email);
    if (foundByEmail) throw new BadRequestException(`Email ${data.email} já cadastrado`);

    if (foundByEmail) {
      if (retorno.id != foundByEmail.id) {
        throw new BadRequestException(`Email ${data.email} já cadastrado`);
      }
    }
    return await this.repo.update(id, data);
  }

  async delete(id: string): Promise<User> {
    const retorno = await this.repo.getById(id.toString());
    if (retorno === null) {
      throw new NotFoundException([`Usuario ${id} não encontrado.`]);
    }
    return await this.repo.delete(id);
  }
  async deleteAll(): Promise<any> {
    return await this.repo.deleteAll();
  }
}
