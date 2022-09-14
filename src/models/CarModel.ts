import { Schema, model as createModel, Document } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

interface CarDocument extends ICar, Document { }

const carsMongooseSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

class CarModel extends MongoModel<ICar> {
  constructor(model = createModel('Cars', carsMongooseSchema)) {
    super(model);
  }
}

export default CarModel;