import { IMotorcycle, MotorcycleVehicle } from '../interfaces/IMotorcycle';
import Service, { ServiceError } from './MongoService';
import MotorcycleModel from '../models/MotorcycleModel';

class MotorcycleService extends Service<IMotorcycle> { 
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (obj: IMotorcycle): Promise<IMotorcycle | ServiceError | null> => {
    const parsed = MotorcycleVehicle.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}

export default MotorcycleService;