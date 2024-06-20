import { z } from 'astro:content';

export const LoginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});
