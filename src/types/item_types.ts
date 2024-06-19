import { z } from 'astro/zod';
import { PageSchema } from './page_types';

export const ItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  price: z.number(),
  birthDay: z.date(),
  image: z.string(),
  gender: z.string(),
  breed: z.string(),
  color: z.string(),
  weight: z.number(),
});

export type Item = z.infer<typeof ItemSchema>;

// ItemのPageスキーマ
export const ItemPageSchema = PageSchema(ItemSchema);

export type ItemPage = z.infer<typeof ItemPageSchema>;
