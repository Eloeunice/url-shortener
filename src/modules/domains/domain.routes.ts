import { Router } from 'express';
import domainController from './domain.controller.js';
import { urlController } from '../urls/url.controller.js';
import { authJwt } from '../middlewares/passport.js';

const domainRoutes = Router();

domainRoutes.get('/', authJwt, (req, res) => {
  return res.json({ message: 'Aqui você encontra todas as suas domínios' });
});

domainRoutes.post('/', authJwt, domainController.create);
domainRoutes.post('/:domainId/url', authJwt, urlController.create);

domainRoutes.put('/:domainId', authJwt, domainController.update);

domainRoutes.delete('/:domainId', authJwt, domainController.delete);

export { domainRoutes };
