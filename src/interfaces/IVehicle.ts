import { z } from 'zod';

const IVehicleSchema = z.object({
  model: z
    .string({
      required_error: 'Model is required',
      invalid_type_error: 'Model must be a string',
    })
    .min(3, { message: 'Model must have 3 or more characters' }),
  year: z
    .number({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a number',
    })
    .min(1900, { message: 'Year must be 1900 or more' })
    .max(2022, { message: 'Year must be 2022 or less' }),
  color: z
    .string({
      required_error: 'Color is required',
      invalid_type_error: 'Color must be a string',
    })
    .min(3, { message: 'Color must have 3 or more characters' }),
  status: z
    .boolean({
      invalid_type_error: 'Status must be a boolean',
    })
    .optional(),
  buyValue: z
    .number({
      required_error: 'BuyValue is required',
      invalid_type_error: 'BuyValue must be a number',
    }).int(),
});

type IVehicle = z.infer<typeof IVehicleSchema>;

export { IVehicleSchema, IVehicle };
