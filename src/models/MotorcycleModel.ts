import { Schema, model as createModel, Document } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

interface MotorcycleDocument extends IMotorcycle, Document { }

const motorcycleMongooseSchema = new Schema<MotorcycleDocument>({
  status: Boolean,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  category: String,
  engineCapacity: Number,
});

class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = createModel('Motorcycle', motorcycleMongooseSchema)) {
    super(model);
  }
}

export default MotorcycleModel;