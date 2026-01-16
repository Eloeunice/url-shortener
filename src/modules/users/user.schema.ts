import { z } from 'zod';

export const createUserSchema = z
  .object({
    email: z.string().nonempty().email('Email inválido'),
    password: z.string().min(6, 'Senha mínima de 6 caracteres'),
    name: z.string().min(1, 'Nome é obrigatório'),
  })
  .strict();

export const updateUserSchema = z
  .object({
    email: z.string().email('Email inválido').optional(),
    password: z.string().min(6, 'Senha mínima de 6 caracteres').optional(),
    name: z.string().min(1, 'Nome é obrigatório').optional(),
  })
  .strict();

export const loginUserSchema = z
  .object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha mínima de 6 caracteres'),
  })
  .strict();

export const deleteUserSchema = z
  .object({
    email: z.string().email('Email inválido'),
  })
  .strict();
