import { z } from 'astro/zod';
export const optionGroup = z.object({
  id: z.string(),
  name: z.string(),
  inputType: z.string(),
});
