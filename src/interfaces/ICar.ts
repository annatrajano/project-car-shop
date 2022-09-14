import { z } from 'zod';

import { IVehicleSchema } from './IVehicle';

const ICarSchema = z.object({
  doorsQty: z.number({ 
    required_error: 'DoorsQty is required', 
    invalid_type_error: 'DoorsQty must be a number' })
    .gte(2, { message: 'DoorsQty must be 2 or more' })
    .lte(4, { message: 'DoorsQty must be 4 or less' }),
  seatsQty: z.number({ 
    required_error: 'SeatQty is required',
    invalid_type_error: 'SeatQty must be a number' })
    .gte(2, { message: 'SeatQty must be 2 or more' })
    .lte(7, { message: 'SeatQty must be 7 or less' }),
});

const CarVehicle = z.intersection(IVehicleSchema, ICarSchema);

type ICar = z.infer<typeof CarVehicle>;

export { CarVehicle, ICar };