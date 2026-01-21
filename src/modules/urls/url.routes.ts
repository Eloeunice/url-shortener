import { Router } from 'express';
import { urlController } from './url.controller.js';

const urlsRouter = Router();

urlsRouter.get('/', (req, res) => {
  return res.json({ message: 'Aqui você encontra todas as suas urls' });
});

urlsRouter.put('/:urlId', urlController.update);

urlsRouter.delete('/:urlId', urlController.delete);

export { urlsRouter };
