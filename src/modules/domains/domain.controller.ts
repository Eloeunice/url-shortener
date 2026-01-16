import { type Request, type Response } from 'express';
export class DomainController {
  async create(req: Request, res: Response) {
    return res.json({ message: 'Domain created' });
  }
  async update(req: Request, res: Response) {
    return res.json({ message: 'Domain updated' });
  }
  async delete(req: Request, res: Response) {
    return res.json({ message: 'Domain deleted' });
  }
}

export const domainController = new DomainController();

export default domainController;
