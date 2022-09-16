import { Response, Request } from 'express';
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

  read = async (
    res: Response<IMotorcycle[] | ResponseError>,
  ): Promise<typeof res> => {
    const motorcycles = await this.service.read();
    return res.status(200).json(motorcycles);
  };

  readOne = async (
    req: Request,
    res: Response<IMotorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: this.errors.invalidId });
      }

      const motorcycle = await this.service.readOne(id);

      return motorcycle
        ? res.status(200).json(motorcycle)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default MotorcycleController;