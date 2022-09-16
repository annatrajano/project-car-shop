import { Response, Request } from 'express';
import MongoController, { RequestWithBody, ResponseError } from './MongoController';
import CarService from '../services/CarService';
import { ICar } from '../interfaces/ICar';

export class CarController extends MongoController<ICar> {
  private _route: string;

  constructor(
    public service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  create = async (
    req: RequestWithBody<ICar>,
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    const car = await this.service.create(body);
    
    if (!car) return res.status(500).json({ error: this.errors.internal });

    if ('error' in car) return res.status(400).json(car);

    return res.status(201).json(car);
  };

  read = async (
    res: Response<ICar[] | ResponseError>,
  ): Promise<typeof res> => {
    const cars = await this.service.read();
    return res.status(200).json(cars);
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: this.errors.invalidId });
      }

      const car = await this.service.readOne(id);

      return car
        ? res.status(200).json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  update = async (
    req: Request, 
    res: Response<ICar | ResponseError>,
  ) => {
    const { id } = req.params;
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: this.errors.invalidId });
      }

      const result = await this.service.update(req.params.id, req.body);
      return result
        ? res.status(200).json(result)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  delete = async (req: Request, res: Response<ICar | ResponseError >) => {
    const { id } = req.params;
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: this.errors.invalidId });
      }
      const result = await this.service.delete(req.params.id);
      return result
        ? res.status(204).json()
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default CarController;