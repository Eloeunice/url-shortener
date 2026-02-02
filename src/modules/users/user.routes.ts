import { Router } from 'express';
import { userController } from './user.controller.js';
import { type Request, type Response } from 'express';
import { authJwt } from '../middlewares/passport.js';

const userRoutes = Router();

userRoutes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Aqui você encontra todos os seus users' });
});

userRoutes.post('/login', (req, res, next) => userController.login(req, res).catch(next));

userRoutes.post('/register', (req, res, next) => userController.create(req, res).catch(next));

userRoutes.put('/:id', authJwt, (req, res, next) => userController.update(req, res).catch(next));

userRoutes.delete('/:id', authJwt, (req, res, next) => userController.delete(req, res).catch(next));

export { userRoutes };
