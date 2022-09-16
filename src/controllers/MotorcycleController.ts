import { Response } from 'express';
import MongoController, { RequestWithBody, ResponseError } from './MongoController';
import MotorcycleService from '../services/MotorcycleService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export class MotorcycleController extends MongoController<IMotorcycle> {
  private _route: string;

  constructor(
    public service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<IMotorcycle>,
    res: Response<IMotorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    const motorcycle = await this.service.create(body);
    
    if (!motorcycle) return res.status(500).json({ error: this.errors.internal });

    if ('error' in motorcycle) return res.status(400).json(motorcycle);

    return res.status(201).json(motorcycle);
  };
}

export default MotorcycleController;