import { Router } from 'express';
import domainController from './domain.controller.js';

const domainRoutes = Router();

domainRoutes.get('/', (req, res) => {
  return res.json({ message: 'Aqui você encontra todas as suas domínios' });
});

domainRoutes.post('/', domainController.create);

domainRoutes.put('/', domainController.update);

domainRoutes.delete('/', domainController.delete);

export { domainRoutes };
