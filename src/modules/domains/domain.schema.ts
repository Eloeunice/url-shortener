import z from 'zod';

export const createDomainSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    subdomain: z.string().optional(),
  })
  .strict();

export const updateDomainSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório').optional(),
    subdomain: z.string().optional(),
    isActive: z.boolean().optional(),
  })
  .strict();

export const deleteDomainSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
  })
  .strict();
