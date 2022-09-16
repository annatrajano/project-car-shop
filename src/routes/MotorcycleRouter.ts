import { Router } from 'express';
import 'express-async-errors';
import { MotorcycleController } from '../controllers/MotorcycleController';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';

const route = Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

route.post('/', (req, res) => motorcycleController.create(req, res));

export default route;