import express from 'express';
import swaggerUi from 'swagger-ui-express';
import routes from './app.js';
import passport from 'passport';
import { swaggerDocument } from './config/swagger.js';
import errorHandler from './modules/middlewares/errorHandler.js';
import './modules/middlewares/passport.js';

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

app.use(errorHandler);

// On Vercel, the platform invokes the app per request; do not call listen().
if (process.env.VERCEL !== '1') {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

export { app };
export default app;
