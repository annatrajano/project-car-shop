import { Router } from 'express';
import 'express-async-errors';
import { CarController } from '../controllers/CarController';
import CarModel from '../models/CarModel';
import CarService from '../services/CarService';

const route = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

route.post('/', (req, res) => carController.create(req, res));
route.get('/', (_req, res) => carController.read(res));
route.get('/:id', (req, res) => carController.readOne(req, res));
route.put('/:id', (req, res) => carController.update(req, res));
route.delete('/:id', (req, res) => carController.delete(req, res));

export default route;