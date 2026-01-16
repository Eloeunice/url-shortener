import { app } from './index.js';
import { urlsRouter } from './modules/urls/url.routes.js';
import { usersRouter } from './modules/users/user.routes.js';

app.use('/urls', urlsRouter);
app.use('/users', usersRouter);
