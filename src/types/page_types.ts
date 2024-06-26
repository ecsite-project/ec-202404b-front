import { z } from 'zod';

const MetadataSchema = z.object({
  currentPage: z.number().int().min(1).describe('currentPage'),
  perPage: z.number().int().min(1).describe('perPage'),
  lastPage: z.number().int().min(0).describe('lastPage'),
  total: z.number().int().min(0).describe('total'),
});

export const PageSchema = <T>(itemSchema: z.ZodType<T>) =>
  z.object({
    metadata: MetadataSchema,
    records: z.array(itemSchema),
  });
