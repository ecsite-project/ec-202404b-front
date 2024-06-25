import { z } from 'astro/zod';
import { ItemSchema } from './item_types';
import { OptionSchema } from './option_type';
export const OrderItemSchema = z.object({
  id: z.string(),
  item: ItemSchema,
  options: z.array(OptionSchema),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;
export const OrderItemListSchema = z.array(OrderItemSchema);
