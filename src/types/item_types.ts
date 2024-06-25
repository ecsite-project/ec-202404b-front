import { z } from 'astro/zod';
import { PageSchema } from './page_types';

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
  birthDay: z.coerce.date(),
  image: z.string(),
  deleted: z.boolean(),
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
  search: z.object({
    maxPrice: z.coerce.number(),
    minPrice: z.coerce.number(),
    colorList: z.array(z.string()),
    breed: z.string(),
  }),
  page: z.object({
    currentPage: z.coerce.number(),
    perPage: z.coerce.number(),
  }),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;

export const OptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

export const OptionListSchema = z.array(OptionSchema);
export type OptionList = z.infer<typeof OptionListSchema>;

const optionGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  inputType: z.enum(['text', 'radio', 'checkbox']),
  options: OptionListSchema,
});

export const ItemDetailSchema = z.object({
  item: ItemSchema,
  optionGroup: z.array(optionGroupSchema),
});

export type ItemDetail = z.infer<typeof ItemDetailSchema>;
