import { z } from 'zod';

const LinkSchema = z.object({
  relation: z.string().describe('relation'),
  url: z.string().describe('url'),
});

const MetadataSchema = z.object({
  page: z.number().int().min(1).describe('page'),
  perPage: z.number().int().min(1).describe('perPage'),
  pageCount: z.number().int().min(1).describe('pageCount'),
  totalCount: z.number().int().min(0).describe('totalCount'),
  links: z.array(LinkSchema).describe('links'),
});

export const PageSchema = <T>(itemSchema: z.ZodType<T>) =>
  z.object({
    metadata: MetadataSchema,
    records: z.array(itemSchema),
  });
