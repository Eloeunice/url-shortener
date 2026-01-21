import { type Request, type Response } from 'express';
import { UserService } from './user.service.js';
import { UserRepository } from './user.repository.js';
import { createUserSchema, loginUserSchema, updateUserSchema } from './user.schema.js';
import { ZodError } from 'zod';
import type { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './user.dto.js';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
  async login(req: Request, res: Response) {
    try {
      const dto: LoginUserDTO = loginUserSchema.parse(req.body);
      const user = await userService.login(dto.email, dto.password);
      return res.status(201).json({ message: 'Usuário Logado', user });
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
    const { email } = req.params;

    if (!email || Array.isArray(email)) {
      return res.status(400).json({ message: 'Invalid email param' });
    }

    const data: UpdateUserDTO = req.body;

    const user = await userService.updateByEmail(email, data);
    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    const { email } = createUserSchema.parse(req.body);

    await userService.delete(email);
    return res.json({ message: 'User deleted' });
  }
}

export const userController = new UserController();
