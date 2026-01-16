import { Router } from 'express';

export const usersRouter = Router();

usersRouter.get('/', (req, res) => {
  return res.json({ message: 'users' });
});

usersRouter.post('/login', (req, res) => {
  return res.json({ message: 'users' });
});

usersRouter.post('/register', (req, res) => {
  return res.json({ message: 'users' });
});

usersRouter.put('/', (req, res) => {
  return res.json({ message: 'users' });
});

usersRouter.delete('/', (req, res) => {
  return res.json({ message: 'users' });
});
