// url.schema.ts
import { z } from 'zod';

export const createUrlSchema = z.object({
  destinationUrl: z.string().url('destinationUrl must be a valid URL'),

  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/, {
      message: 'slug must be lowercase, alphanumeric or dash',
    })
    .optional(),
});

export const updateUrlSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/, {
      message: 'slug must be lowercase, alphanumeric or dash',
    })
    .optional(),

  destinationUrl: z.string().url('destinationUrl must be a valid URL').optional(),

  isActive: z.boolean().optional(),
});
