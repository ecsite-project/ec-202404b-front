import { z } from 'astro/zod';
import { ItemSchema, OptionSchema } from './item_types';
export const OrderItemSchema = z.object({
  id: z.string(),
  item: ItemSchema,
  options: z.array(OptionSchema),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;
export const OrderItemListSchema = z.array(OrderItemSchema);
