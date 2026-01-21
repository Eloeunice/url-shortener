import { Router } from 'express';
import domainController from './domain.controller.js';
import { urlController } from '../urls/url.controller.js';

const domainRoutes = Router();

domainRoutes.get('/', (req, res) => {
  return res.json({ message: 'Aqui você encontra todas as suas domínios' });
});

domainRoutes.post('/', domainController.create);
domainRoutes.post('/:domainId/url', urlController.create);

domainRoutes.put('/:domainId', domainController.update);

domainRoutes.delete('/:domainId', domainController.delete);

export { domainRoutes };
