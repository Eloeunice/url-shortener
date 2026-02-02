import { Router } from 'express';
import domainController from './domain.controller.js';
import { urlController } from '../urls/url.controller.js';
import { authJwt } from '../middlewares/passport.js';

const domainRoutes = Router();

domainRoutes.get('/', authJwt, (req, res) => {
  return res.json({ message: 'Aqui você encontra todas as suas domínios' });
});

domainRoutes.post('/', authJwt, (req, res, next) => domainController.create(req, res).catch(next));
domainRoutes.post('/:domainId/url', authJwt, (req, res, next) => urlController.create(req, res).catch(next));

domainRoutes.put('/:domainId', authJwt, (req, res, next) => domainController.update(req, res).catch(next));

domainRoutes.delete('/:domainId', authJwt, (req, res, next) => domainController.delete(req, res).catch(next));

export { domainRoutes };
