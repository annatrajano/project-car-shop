import { Router } from 'express';
import CarRouter from './CarRouter';

const index = Router();

index.use('/cars', CarRouter);

export default index;