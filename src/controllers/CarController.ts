import { Response } from 'express';
import MongoController, { RequestWithBody, ResponseError } from './MongoController';
import CarService from '../services/CarService';
import { ICar } from '../interfaces/ICar';

class CarController extends MongoController<ICar> {
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
}

export default CarController;