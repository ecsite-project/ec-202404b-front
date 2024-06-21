import { z } from 'astro/zod';
export const OrderItemSchema = z.object({
  id: z.string(),
  item_id: z.string(),
  order_id: z.string(),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;
export const OrderItemListSchema = z.array(OrderItemSchema);
