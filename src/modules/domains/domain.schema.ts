import z from 'zod';

export const createDomainSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    userId: z.number(),
    subdomain: z.string().optional(),
  })
  .strict();

export const updateDomainSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
  })
  .strict();

export const deleteDomainSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
  })
  .strict();
