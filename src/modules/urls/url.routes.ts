import { Router } from 'express';
import { urlController } from './url.controller.js';
import { authJwt } from '../middlewares/passport.js';

const urlsRouter = Router();

urlsRouter.get('/', authJwt, (req, res) => {
  return res.json({ message: 'Aqui você encontra todas as suas urls' });
});

urlsRouter.put('/:urlId', authJwt, urlController.update);

urlsRouter.delete('/:urlId', authJwt, urlController.delete);

export { urlsRouter };
