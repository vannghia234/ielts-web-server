/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';
export class ResponseBase {
  public readonly id: string;
  public readonly timestamp: Date;
  public readonly apiVersion: string;
  public readonly statusCode: string;
  public readonly message: string;
  public readonly data: any;

  constructor(status: string, message: string, data?: any) {
    this.id = uuidv4();
    this.timestamp = new Date();
    this.apiVersion = '1.0';
    this.statusCode = status;
    this.message = message;
    this.data = data;
  }

  toJSON(): any {
    return {
      id: this.id,
      timestamp: this.timestamp.toISOString(),
      apiVersion: this.apiVersion,
      status: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}
