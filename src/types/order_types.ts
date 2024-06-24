import { z } from 'astro/zod';
export const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  status: z.string(),
  totalPrice: z.coerce.number(),
  orderDate: z.string(),
  destinationName: z.string().default(''),
  destinationEmail: z.string().email(),
  destinationZipcode: z.string(),
  destinationPrefecture: z.string(),
  destinationMunicipalities: z.string(),
  destinationAddress: z.string(),
  destinationTel: z.string(),
  deliveryDate: z.string(),
  deliveryTime: z.string().optional(),
  paymentMethod: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;
