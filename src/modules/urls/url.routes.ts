import { Router } from 'express';
import { urlController } from './url.controller.js';
import { authJwt } from '../middlewares/passport.js';

const urlsRouter = Router();

urlsRouter.get('/', authJwt, (req, res) => {
  return res.json({ message: 'Aqui você encontra todas as suas urls' });
});

urlsRouter.put('/:urlId', authJwt, (req, res, next) => urlController.update(req, res).catch(next));

urlsRouter.delete('/:urlId', authJwt, (req, res, next) => urlController.delete(req, res).catch(next));

export { urlsRouter };
