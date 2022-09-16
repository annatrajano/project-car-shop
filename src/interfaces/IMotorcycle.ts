import { z } from 'zod';

import { IVehicleSchema } from './IVehicle';

const IMotorcycleSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z
    .number({
      required_error: 'EngineCapacity is required',
      invalid_type_error: 'EngineCapacity must be a number',
    })
    .lte(2500, { message: 'EngineCapacity must be 2500 or less' }).positive(),
});

const MotorcycleVehicle = z.intersection(IVehicleSchema, IMotorcycleSchema);

type IMotorcycle = z.infer<typeof MotorcycleVehicle>;

export { MotorcycleVehicle, IMotorcycle };