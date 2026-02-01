import { type Request, type Response } from 'express';
import { UserService } from './user.service.js';
import { UserRepository } from './user.repository.js';
import { createUserSchema, loginUserSchema } from './user.schema.js';
import { ZodError } from 'zod';
import type { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './user.dto.js';
import jwt from 'jsonwebtoken';
import { authConfig } from '../../config/auth.js';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
  async login(req: Request, res: Response) {
    try {
      const dto: LoginUserDTO = loginUserSchema.parse(req.body);
      const user = await userService.login(dto.email, dto.password);

      if (!authConfig.jwt.secret) {
        throw new Error('JWT_SECRET não definida');
      }
      const token = jwt.sign(
        {
          sub: user.id,
        },
        authConfig.jwt.secret,
        {
          expiresIn: '1d', // ou '1h', '7d', etc
        },
      );

      res.set('Authorization', `Bearer ${token}`);
      return res.status(201).json({ message: 'Usuário Logado' });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const dto: CreateUserDTO = createUserSchema.parse(req.body);
      const user = await userService.create(dto.email, dto.password, dto.name);
      return res.status(201).json(user);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json(error.issues);
      }
      return res.status(400).json({
        message: error.message || 'Unexpected error',
      });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: 'Invalid id param' });
    }

    // Se o id for um número, é o ID do usuário, senão é o email
    const userId = Number(id);
    if (Number.isNaN(userId)) {
      // É um email
      const data: UpdateUserDTO = req.body;
      const user = await userService.updateByEmail(id, data);
      return res.json(user);
    } else {
      // É um ID numérico - precisaríamos de um método updateById
      return res.status(400).json({ message: 'Update by ID not implemented. Use email instead.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: 'Invalid id param' });
    }

    // Se o id for um número, é o ID do usuário, senão é o email
    const userId = Number(id);
    if (Number.isNaN(userId)) {
      // É um email
      await userService.delete(id);
      return res.json({ message: 'User deleted' });
    } else {
      // É um ID numérico - precisaríamos de um método deleteById
      return res.status(400).json({ message: 'Delete by ID not implemented. Use email instead.' });
    }
  }
}

export const userController = new UserController();
