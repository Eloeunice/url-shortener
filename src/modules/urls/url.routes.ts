import { Router } from 'express';

const urlsRouter = Router();

urlsRouter.get('/', (req, res) => {
  return res.json({ message: 'Aqui você encontra todas as suas urls' });
});

urlsRouter.post('/', (req, res) => {
  return res.json({ message: 'urls' });
});

export { urlsRouter };
