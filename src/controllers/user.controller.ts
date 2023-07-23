import { Controller, Get, Param, Post, Body, Put, Delete, Inject } from '@nestjs/common';

import { IUserService } from '../services/user.service';
import { IHttpCustomResponse } from 'src/response/http-custom-response';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
    @Inject(IHttpCustomResponse) private readonly httpResponse: IHttpCustomResponse
  ) {}

  @Get()
  async getAll(): Promise<any> {
    return this.httpResponse.HttpResponse(await this.userService.getAll(), 'GET');
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    return this.httpResponse.HttpResponse(await this.userService.getById(id), 'GET');
  }

  @Post()
  async create(@Body() payload: CreateUserDto): Promise<any> {
    return this.httpResponse.HttpResponse(await this.userService.create(payload), 'POST');
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<any> {
    return this.httpResponse.HttpResponse(await this.userService.update(id, data), 'PUT');
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<any> {
    return this.httpResponse.HttpResponse(await this.userService.delete(id), 'DELETE');
  }
}
