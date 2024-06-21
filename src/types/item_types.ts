import { z } from 'astro/zod';
import { PageSchema } from './page_types';

export const ColorSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export const BreedSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const ItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  price: z.number(),
  birthDay: z.coerce.date(),
  image: z.string(),
  gender: z.string(),
  breed: BreedSchema,
  color: ColorSchema,
});

export type Item = z.infer<typeof ItemSchema>;

// ItemのPageスキーマ
export const ItemPageSchema = PageSchema(ItemSchema);

export type ItemPage = z.infer<typeof ItemPageSchema>;

export const ItemListSchema = z.array(ItemSchema);

export type ItemList = z.infer<typeof ItemListSchema>;

export const SearchQuerySchema = z.object({
  maxPrice: z.coerce.number().optional(),
  minPrice: z.coerce.number().optional(),
  colorList: z.array(z.string()).optional(),
  breedId: z.string().optional(),
  page: z.number().optional(),
  perPage: z.number().optional(),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;
