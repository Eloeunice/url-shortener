import { app } from './index.js';
import { urlsRouter } from './modules/urls/url.routes.js';

app.use('/urls', urlsRouter);
