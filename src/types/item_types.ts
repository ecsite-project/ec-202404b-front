import { z } from 'astro/zod';

export const BreedSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const ColorSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const ItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  price: z.number(),
  birthDay: z.string(),
  image: z.string(),
  gender: z.string(),
  breed: BreedSchema,
  color: ColorSchema,
});

export type Item = z.infer<typeof ItemSchema>;

export const ItemListSchema = z.array(ItemSchema);
