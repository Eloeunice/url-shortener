import z from 'zod';
import { type Request, type Response } from 'express';

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

export class UserController {
  async create(req: Request, res: Response) {
    const { email, password, name } = createUserSchema.parse(req.body);

    return res.json({ email, password, name });
  }

  async update(req: Request, res: Response) {
    const { email, password, name } = createUserSchema.parse(req.body);

    return res.json({ email, password, name });
  }

  async delete(req: Request, res: Response) {
    return res.json({ message: 'User deleted' });
  }
}
