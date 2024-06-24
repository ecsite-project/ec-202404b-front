import { z } from 'astro/zod';
export const OptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

export const OptionListSchema = z.array(OptionSchema);
export type OptionList = z.infer<typeof OptionListSchema>;
