import { domainRoutes } from './modules/domains/domain.routes.js';
import { urlsRouter } from './modules/urls/url.routes.js';
import { userRoutes } from './modules/users/user.routes.js';
import { Router } from 'express';

const routes = Router();
routes.use('/url', urlsRouter);
routes.use('/user', userRoutes);
routes.use('/domain', domainRoutes);

export default routes;
