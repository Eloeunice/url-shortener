import { Router } from 'express';
import { urlController } from './url.controller.js';
import { url } from 'node:inspector';

const urlsRouter = Router();

urlsRouter.get('/', (req, res) => {
  return res.json({ message: 'Aqui você encontra todas as suas urls' });
});

urlsRouter.post('/', urlController.create);

urlsRouter.put('/:id', urlController.update);

urlsRouter.delete('/:id', urlController.delete);

export { urlsRouter };
