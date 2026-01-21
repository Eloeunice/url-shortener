import { Router } from 'express';
import { userController } from './user.controller.js';
import { type Request, type Response } from 'express';

const userRoutes = Router();

userRoutes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Aqui você encontra todos os seus users' });
});

userRoutes.post('/login', userController.login);

userRoutes.post('/register', userController.create);

userRoutes.put('/:id', userController.update);

userRoutes.delete('/:id', userController.delete);

export { userRoutes };
