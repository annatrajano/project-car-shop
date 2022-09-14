import { Request, Response } from 'express';
import MongoService from '../services/MongoService';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  invalidId = 'Id must have 24 hexadecimal characters',
  badRequest = 'Bad request',
}

abstract class MongoController<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: MongoService<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;
}
export default MongoController;