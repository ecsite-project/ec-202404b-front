import { z } from 'astro/zod';
import { optionGroup } from './optionGroup_type';
export const OptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  optionGroup: optionGroup,
});
