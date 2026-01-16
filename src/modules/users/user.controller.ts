import { type Request, type Response } from 'express';
import { UserService } from './user.service.js';
import { UserRepository } from './user.repository.js';
import { createUserSchema, loginUserSchema, updateUserSchema } from './user.schema.js';
import { ZodError } from 'zod';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginUserSchema.parse(req.body);
      const user = await userService.login(email, password);
      return res.status(201).json({ message: 'Usuário Logado' });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { email, password, name } = createUserSchema.parse(req.body);
      const user = await userService.create(email, password, name);
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
    const { email, password, name } = updateUserSchema.parse(req.body);

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!password && !name) {
      return res.status(400).json({ error: 'At least one field must be updated' });
    }

    await userService.update(email, password, name);

    return res.json({ email, password, name });
  }

  async delete(req: Request, res: Response) {
    const { email } = createUserSchema.parse(req.body);

    await userService.delete(email);
    return res.json({ message: 'User deleted' });
  }
}

export const userController = new UserController();
