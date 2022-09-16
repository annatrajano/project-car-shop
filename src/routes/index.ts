import { Router } from 'express';
import CarRouter from './CarRouter';
import MotorcycleRouter from './MotorcycleRouter';

const index = Router();

index.use('/cars', CarRouter);
index.use('/motorcycles', MotorcycleRouter);

export default index;