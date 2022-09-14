import { ICar, CarVehicle } from '../interfaces/ICar';
import Service, { ServiceError } from './MongoService';
import CarModel from '../models/CarModel';

class CarService extends Service<ICar> { 
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: ICar): Promise<ICar | ServiceError | null> => {
    const parsed = CarVehicle.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}

export default CarService;