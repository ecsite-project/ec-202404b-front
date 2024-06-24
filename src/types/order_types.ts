import { z } from 'astro/zod';
export const OrderSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  status: z.number(),
  total_price: z.number(),
  order_date: z.string(),
  destination_name: z.string().default(''),
  destination_email: z.string().email(),
  destination_zipcode: z.string(),
  destination_prefecture: z.string(),
  destination_municipalities: z.string(),
  destination_address: z.string(),
  destination_tel: z.string(),
  delivery_date: z.string(),
  delivery_time: z.string(),
  payment_method: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;
export const OrderListSchema = z.array(OrderSchema);
