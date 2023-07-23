import { Injectable, NotFoundException } from '@nestjs/common';

export interface IHttpCustomResponse {
  HttpResponse(data: any, method?: string);
  isNullOrEmpty(data: any): boolean;
}

export const IHttpCustomResponse = Symbol('IHttpCustomResponse');
@Injectable()
export class HttpCustomResponse implements IHttpCustomResponse {
  public HttpResponse(data: any, method?: string) {
    if (this.isNullOrEmpty(data)) {
      throw new NotFoundException(['no records found']);
    }
    return {
      statusCode: method == 'POST' ? 201 : 200,
      data,
      timestamp: new Date().toISOString(),
      message: [data?.message || 'success'],
      method,
    };
  }

  public isNullOrEmpty(data: any): boolean {
    return data == undefined || data == null || data == '';
  }
}
