import { type Request, type Response, type NextFunction } from 'express';

async function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  return res.status(500).json({ message: err.message });
}

export default errorHandler;
